import handlebars  from "handlebars";
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export default class TemplateParser {
  public async parse({
    template,
    variables
  }: IParseMailTemplate) : Promise<string> {
    const templateFileContent = await fs.promises
      .readFile(template, {
        encoding: 'utf8'
      });

    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}

