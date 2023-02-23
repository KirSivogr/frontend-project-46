import path from 'path';
import yaml from 'js-yaml';

export default function parse(filename) {
  const fileFormat = path.extname(filename);
  if (fileFormat === '.json') {
    return JSON.parse;
  }

  return yaml.load;
}
