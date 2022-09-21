import type { TransformFnParams } from 'class-transformer';

const _REPLACE_SUFFIX: string = ':hash';
const API_REDIRECT_RESOURCE = 'http://localhost:3333/r/:hash';

export function targetTransformerCallback(params: TransformFnParams): string {
  const { hash } = params.obj as { hash: string }; //

  return API_REDIRECT_RESOURCE.replace(_REPLACE_SUFFIX, hash);
}
