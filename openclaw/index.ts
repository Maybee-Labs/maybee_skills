export const plugin = {
  name: "@maybee/openclaw-plugin",
  version: "0.1.0",
  skills: [
    {
      name: "maybee-trading",
      skillPath: "./skills/maybee-trading/SKILL.md",
      requestTemplatePath: "./skills/maybee-trading/request.template.json"
    },
    {
      name: "maybee-social",
      skillPath: "./skills/maybee-social/SKILL.md",
      requestTemplatePath: "./skills/maybee-social/request.template.json"
    }
  ]
};

export default plugin;
