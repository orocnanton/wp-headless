const API_URL = 'https://rezacadadia.com/wp-json/wp/v2';

// Función para obtener el ID de la categoría "Oraciones cristianas"
let oracionesCategoriaId = null;

export async function getOracionesCategoriaId() {
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

// Modifica la función getPosts para aceptar parámetros de paginación
export async function getPosts(page = 1, perPage = 10) {
  try {
    const response = await fetch(`${API_URL}/posts?_embed=true&per_page=${perPage}&page=${page}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Mejora la función getPost con manejo de errores
export async function getPost(slug) {
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
export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  return await response.json();
}

// Función para obtener subcategorías de Oraciones cristianas
export async function getOracionesSubcategorias() {
  const categoriaId = await getOracionesCategoriaId();
  const response = await fetch(`${API_URL}/categories?parent=${categoriaId}`);
  return await response.json();
}

export async function getPages() {
  const response = await fetch(`${API_URL}/pages?_embed`);
  return await response.json();
}

export async function getPage(slug) {
  const pages = await fetch(`${API_URL}/pages?slug=${slug}&_embed`);
  const data = await pages.json();
  return data[0];
}

// Obtener una categoría específica por slug
export async function getCategory(slug) {
  const response = await fetch(`${API_URL}/categories?slug=${slug}`);
  const data = await response.json();
  return data[0];
}

// Obtener posts de una categoría específica por ID
export async function getPostsByCategory(categoryId, page = 1) {
  const response = await fetch(`${API_URL}/posts?categories=${categoryId}&page=${page}&_embed`);
  return await response.json();
}

// Obtener posts de una categoría y sus subcategorías
export async function getPostsByCategoryAndChildren(categoryId, page = 1, perPage = 12) {
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
export async function getRelatedPosts(postId, categoryIds, count = 6) {
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

// También puedes usar GraphQL si has instalado WPGraphQL
export async function fetchGraphQL(query) {
  const response = await fetch('https://rezacadadia.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  return await response.json();
}

// Función para obtener páginas legales
export async function getLegalPages() {
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
export async function getLegalPage(slug) {
  const response = await fetch(`${API_URL}/pages?slug=${slug}&_embed`);
  const data = await response.json();
  return data[0]; // Devolvemos la primera coincidencia
}

// Función para obtener el ID de la categoría "Blog" o "Artículos"
let blogCategoriaId = null;

export async function getBlogCategoriaId() {
  if (blogCategoriaId === null) {
    const categorias = await getCategories();
    const blogCategoria = categorias.find(cat => 
      cat.slug === 'blog' || 
      cat.slug === 'articulos' ||
      cat.name.toLowerCase().includes('blog') ||
      cat.name.toLowerCase().includes('articulo')
    );
    
    if (blogCategoria) {
      blogCategoriaId = blogCategoria.id;
    } else {
      // Si no encuentra la categoría, usamos un valor por defecto
      console.warn('No se encontró la categoría "Blog" o "Artículos"');
      blogCategoriaId = 0;
    }
  }
  return blogCategoriaId;
}

// Función para obtener artículos de blog
export async function getBlogPosts(page = 1, perPage = 12) {
  try {
    // Intentamos obtener por categoría específica de blog
    const blogId = await getBlogCategoriaId();
    
    if (blogId > 0) {
      // Si encontramos una categoría específica de blog
      return await getPostsByCategoryAndChildren(blogId, page, perPage);
    } else {
      // Si no hay categoría de blog, excluimos las oraciones
      const oracionesId = await getOracionesCategoriaId();
      
      const params = new URLSearchParams({
        categories_exclude: oracionesId,
        page: page,
        per_page: perPage,
        _embed: true
      });
      
      const response = await fetch(`${API_URL}/posts?${params}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching blog posts: ${response.status}`);
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
}
