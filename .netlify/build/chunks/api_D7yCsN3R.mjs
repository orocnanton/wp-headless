const API_URL = 'https://rezacadadia.com/wp-json/wp/v2';

// Función para obtener el ID de la categoría "Oraciones cristianas"
let oracionesCategoriaId = null;

async function getOracionesCategoriaId() {
  if (oracionesCategoriaId === null) {
    const categorias = await getCategories();
    const oracionesCategoria = categorias.find(cat => 
      cat.slug === 'oraciones-cristianas' || 
      cat.slug === 'oraciones' || 
      cat.name.toLowerCase().includes('oracion')
    );
    
    if (oracionesCategoria) {
      oracionesCategoriaId = oracionesCategoria.id;
    } else {
      // Si no encuentra la categoría, usamos un valor por defecto
      console.warn('No se encontró la categoría "Oraciones cristianas"');
      oracionesCategoriaId = 0;
    }
  }
  return oracionesCategoriaId;
}

// Función modificada para obtener solo posts de la categoría Oraciones cristianas
// con soporte para paginación
async function getPosts(page = 1, perPage = 12) {
  const categoriaId = await getOracionesCategoriaId();
  return getPostsByCategoryAndChildren(categoriaId, page, perPage);
}

// Mejora la función getPost con manejo de errores
async function getPost(slug) {
  try {
    const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);
    
    if (!response.ok) {
      console.error(`Error fetching post: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Obtener todas las categorías - modificada para devolver solo Oraciones cristianas y sus hijas
async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  return await response.json();
}

// Función para obtener subcategorías de Oraciones cristianas
async function getOracionesSubcategorias() {
  const categoriaId = await getOracionesCategoriaId();
  const response = await fetch(`${API_URL}/categories?parent=${categoriaId}`);
  return await response.json();
}

// Obtener una categoría específica por slug
async function getCategory(slug) {
  const response = await fetch(`${API_URL}/categories?slug=${slug}`);
  const data = await response.json();
  return data[0];
}

// Obtener posts de una categoría y sus subcategorías
async function getPostsByCategoryAndChildren(categoryId, page = 1, perPage = 12) {
  try {
    // Primero obtenemos las subcategorías
    const categoriesResponse = await fetch(`${API_URL}/categories?parent=${categoryId}`);
    const childCategories = await categoriesResponse.json();
    
    // Creamos un array con la categoría padre y todas sus hijas
    const categoryIds = [categoryId, ...childCategories.map(cat => cat.id)];
    
    // Construimos los parámetros con el número de posts por página
    const params = new URLSearchParams({
      categories: categoryIds.join(','),
      page: page,
      per_page: perPage,
      _embed: true
    });
    
    // Obtenemos los posts de todas estas categorías
    const response = await fetch(`${API_URL}/posts?${params}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching category posts: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting category posts:', error);
    return [];
  }
}

// Función para obtener posts relacionados
async function getRelatedPosts(postId, categoryIds, count = 6) {
  // Excluimos el post actual y buscamos en sus mismas categorías
  const params = new URLSearchParams({
    exclude: postId,
    categories: categoryIds.join(','),
    per_page: count,
    _embed: true
  });
  
  const response = await fetch(`${API_URL}/posts?${params}`);
  return await response.json();
}

// Función para obtener páginas legales
async function getLegalPages() {
  // Búsqueda por slugs específicos de páginas legales
  const legalSlugs = ['politica-de-privacidad', 'politica-de-cookies', 'aviso-legal'];
  const params = new URLSearchParams({
    slug: legalSlugs.join(','),
    _embed: true,
    per_page: 10
  });
  
  const response = await fetch(`${API_URL}/pages?${params}`);
  return await response.json();
}

// Función para obtener una página legal específica por slug
async function getLegalPage(slug) {
  const response = await fetch(`${API_URL}/pages?slug=${slug}&_embed`);
  const data = await response.json();
  return data[0]; // Devolvemos la primera coincidencia
}

export { getOracionesCategoriaId as a, getCategory as b, getPostsByCategoryAndChildren as c, getCategories as d, getLegalPage as e, getLegalPages as f, getPosts as g, getPost as h, getRelatedPosts as i, getOracionesSubcategorias as j };
