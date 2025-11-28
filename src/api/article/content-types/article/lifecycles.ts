declare var strapi: any;

export default {
  async afterCreate(event) {
    const { result } = event;
    if (result.publishedAt) {
      await updateTagsForArticle(result.id);
    }
  },

  async afterUpdate(event) {
    const { result } = event;
    if (result.publishedAt) {
      await updateTagsForArticle(result.id);
    }
  },
};

async function updateTagsForArticle(articleId: number | string) {
  try {
    // Fetch the article with its tags
    const article = await strapi.entityService.findOne(
      "api::article.article",
      articleId,
      {
        populate: ["tags"],
      }
    );

    if (!article || !article.tags || article.tags.length === 0) {
      return;
    }

    const summaryService = strapi.service("api::tag.summary");

    // Trigger update for each tag
    // We use Promise.allSettled to ensure one failure doesn't stop others
    await Promise.allSettled(
      article.tags.map((tag) => summaryService.updateTagSummary(tag.documentId))
    );
  } catch (error) {
    console.error(
      `Error updating tag summaries for article ${articleId}:`,
      error
    );
  }
}
