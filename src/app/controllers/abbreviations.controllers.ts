import { NextFunction, Request, Response } from 'express';
import { getRepository, IsNull, Not } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

import { Abbreviation } from '../entities/abbreviation.entity';
import { NanoIdFactory } from '../../nanoid.factory';

import {
  MethodExecutionConfig,
  Safe,
} from '../typings/decorators/safe.decorator';

export class AbbreviationController {
  /**
   * - All
   */
  @Safe()
  async all(request: Request, _: Response): Promise<MethodExecutionConfig> {
    const abbreviationRepository = getRepository(Abbreviation);

    const abbreviationsPlain = await abbreviationRepository.find({
      order: {
        hits: 'DESC' /** -1 */,
      },
      select: Abbreviation.whitelist(),
    });

    // Add `targed_url` field.
    const abbreviations = instanceToPlain(abbreviationsPlain);

    return {
      atempt: {
        status: 200,
      },
      data: {
        data: { abbreviations },
        _meta: {
          api: {
            version: '1.0.0',
          },
          authors: ['José Lucas - @lucasbernardol'],
        },
      },
    };
  }

  /**
   * - Create
   */
  @Safe()
  async create(request: Request, _: Response): Promise<MethodExecutionConfig> {
    const { original_url } = request.body as { original_url: string };

    const abbreviationRepository = getRepository(Abbreviation);

    // - Hash with `nanoid.js`
    const hash = NanoIdFactory.sign();

    const abbreviationInstance = abbreviationRepository.create({
      original_url,
      hash,
    });

    const abbreviationPlain = await abbreviationRepository.save(
      abbreviationInstance
    );

    const abbreviation = instanceToPlain(abbreviationPlain) as Abbreviation;

    return {
      data: abbreviation,
      atempt: {
        status: 201, // created
      },
    };
  }

  /**
   * @description All `abbreviations` in trash.
   */
  @Safe()
  async inTrash(request: Request, _: Response): Promise<MethodExecutionConfig> {
    const abbreviationsRepository = getRepository(Abbreviation);

    const abbreviations = await abbreviationsRepository.find({
      where: {
        deleted_at: Not(IsNull()),
      },
      select: Abbreviation.whitelist(), // static method.
      withDeleted: true,
    });

    return {
      data: {
        abbreviations,
      },
    };
  }

  async redirect(request: Request, response: Response, next: NextFunction) {
    try {
      const { hash } = request.params as { hash: string };

      const abbreviationsRepositories = getRepository(Abbreviation);

      const abbreviation = await abbreviationsRepositories.findOne({
        where: {
          hash,
        },
        select: ['id', 'original_url'], // Query performance.
      });

      if (!abbreviation) {
        return response
          .status(400)
          .json({ message: 'Abbreviation: not found' });
      }

      // Increment hits
      await abbreviationsRepositories.increment({ hash }, 'hits', 1);

      return response.redirect(abbreviation.original_url);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * - All `abbreviation` public keys.
   */
  async keys(request: Request, response: Response, next: NextFunction) {
    try {
      const keys = Abbreviation.whitelist();

      return response.json(keys);
    } catch (error) {
      return next(error);
    }
  }
}
