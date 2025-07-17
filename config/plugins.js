module.exports = () => ({
  translate: {
    enabled: true,
    config: {
      // Add the name of your provider here (for example 'deepl' for strapi-provider-translate-deepl or the full package name)
      provider: "deepl",
      providerOptions: {
        apiKey: process.env.DEEPL_API_KEY,
      },
      localeMap: {
        EN: "EN-US",
      },
      // Which field types are translated (default string, text, richtext, components and dynamiczones)
      // Either string or object with type and format
      // Possible formats: plain, markdown, html, jsonb (default plain)
      translatedFieldTypes: [
        "string",
        { type: "blocks", format: "jsonb" },
        { type: "text", format: "plain" },
        { type: "richtext", format: "markdown" },
        "component",
        "dynamiczone",
      ],
      // If relations should be translated (default true)
      translateRelations: true,
    },
  },
  documentation: {
    enabled: true,
    config: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Oltre STRAPI API",
        description: "",
        contact: {
          name: "Oltre",
          email: "jjy.quem@gmail.com",
          url: "olter.dev",
        },
        license: {
          name: "UNLICENSED",
        },
      },
      "x-strapi-config": {
        // Leave empty to ignore plugins during generation
        plugins: ["upload", "users-permissions"],
        path: "/documentation",
      },
      servers: [
        { url: "http://localhost:1337/api", description: "Development server" },
        {
          url: "https://shining-broccoli-866f330b9c.strapiapp.com/api",
          description: "Production server",
        },
      ],
      security: [{ bearerAuth: [] }],
    },
  },
});
