export const plugin = {
  name: "@maybee/openclaw-plugin",
  version: "0.1.0",
  skills: [
    {
      name: "maybee-trading",
      skillPath: "./skills/maybee-trading/SKILL.md",
      requestTemplatePath: "./skills/maybee-trading/request.template.json"
    }
  ]
};

export default plugin;
