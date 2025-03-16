import { g as getPosts } from '../../chunks/api_D7yCsN3R.mjs';
export { renderers } from '../../renderers.mjs';

// Cambiar "get" a "GET" para evitar la advertencia de obsolescencia
async function GET({ request, url }) {
  try {
    // Obtener parámetros
    const params = new URL(request.url).searchParams;
    const page = parseInt(params.get('page') || '1');
    const perPage = parseInt(params.get('perPage') || '12');
    
    // Usamos getPosts() en lugar de getBlogPosts() para obtener solo oraciones cristianas
    const posts = await getPosts(page, perPage);
    const hasMore = posts.length === perPage; // Asumimos que hay más si nos devuelve el número máximo
    
    return new Response(
      JSON.stringify({
        posts,
        currentPage: page,
        hasMore
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error en API get-posts:', error);
    return new Response(
      JSON.stringify({
        error: 'Error al obtener los posts',
        message: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
