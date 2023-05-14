import { CWD } from '@/constants';
import { useOptions } from '@/utils';

export const { setOption, getOption } = useOptions({
  cwd: CWD,
  ignore: [/node_modules$/],
});
