const apolloRequest = async (client, query) => {
  try {
    const result = await client.query({
      query: query,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default apolloRequest;
