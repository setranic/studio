// src/lib/static-paths.ts

/**
 * Returns a list of slugs for static generation.
 * 
 * IMPORTANT: To ensure new blog posts are included in the static build,
 * you must manually add their slugs to the array below.
 * This is a workaround to prevent build failures in environments
 * that struggle with dynamic data fetching during the build process.
 * 
 * Example:
 * return ['mi-primera-publicacion', 'otra-noticia-importante'];
 */
export async function getPostSlugs(): Promise<string[]> {
  // Add slugs here manually for each new publication.
  // This array tells Next.js which pages to pre-render at build time.
  const staticSlugs = [
    'regulaciones-permisos-aduaneros',
    'recomendaciones-carga-internacional-nicaragua',
    'rutas-aduaneras-terrestres-nicaragua',
    'IA-transporte-carga-nicaragua',
    'Distribucion-de-mercancias-nicaragua-transporte',
    'Importancia-distribucion-nicaragua-2026',
    'por-que-elegir-a-setranic-distribucion-nicaragua',
    'Distribucion-Local-en-Nicaragua',
    'Rentabilidad%20Distribucion%20Nicaragua%20Setranic',
    'Setranic%20como%20evitar%20errores%20de%20distribucion',
    'Distribucion-ventajas-mercado-nicaragüense',
    'comunicacion-eficaz-logistica'
  ];

  return staticSlugs;
}
