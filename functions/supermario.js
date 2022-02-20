export async function handler() {
  console.log('func run');

  const data = {
    name: 'mario',
    age: 25,
    job: 'plumber',
  };
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
