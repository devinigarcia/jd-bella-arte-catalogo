/* Arquivo temporário para manter os scripts de catálogo */

// Função para filtrar produtos por categoria
function filterProducts(category) {
  // Mapeamento de IDs de categorias para nomes amigáveis
  const categoryNames = {
    'prateleiras': 'Prateleiras',
    'camas': 'Camas e Beliches',
    'moveis-festas': 'Móveis para Festas',
    'conjuntos': 'Conjuntos',
    'estantes': 'Estantes',
    'aparadores': 'Aparadores',
    'banquetas': 'Banquetas',
    'areas-externas': 'Móveis para Áreas Externas',
    'chales-modulares': 'Chalés Modulares',
    'moveis-sob-medida': 'Móveis sob Medida'
  };
  
  // Selecionar os elementos necessários
  const categoryProductsSection = document.getElementById('category-products');
  const categoryGrid = document.querySelector('.category-grid');
  const categoryTitle = document.getElementById('category-title');
  const categorySubtitle = document.getElementById('category-subtitle');
  const categoryProductsContainer = document.getElementById('category-products-container');
  
  // Atualizar título e subtítulo
  categoryTitle.textContent = categoryNames[category] || 'Produtos';
  categorySubtitle.textContent = `Explore nossa seleção de ${categoryNames[category] || 'produtos'}`;
  
  // Limpar o contêiner de produtos
  categoryProductsContainer.innerHTML = '';
  
  // Para cada categoria, temos um conjunto de imagens a carregar
  const imageUrls = getImageUrlsForCategory(category);
  
  if (imageUrls.length === 0) {
    categoryProductsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 0;">
        <h3>Produtos em breve!</h3>
        <p>Estamos preparando novos produtos para esta categoria.</p>
        <a href="https://wa.me/5541996390108?text=Olá,%20gostaria%20de%20informações%20sobre%20${encodeURIComponent(categoryNames[category])}" 
           class="btn btn-primary" style="margin-top: 1rem;">Consultar Disponibilidade</a>
      </div>
    `;
    
    // Mostrar seção de produtos e esconder grid de categorias
    categoryProductsSection.style.display = 'block';
    categoryGrid.style.display = 'none';
    
    return;
  }
  
  // Adicionar cards de produtos
  imageUrls.forEach(url => {
    const productCard = document.createElement('div');
    productCard.className = 'category-product-card animate-on-scroll';
    
    const img = document.createElement('img');
    img.src = url;
    img.alt = `${categoryNames[category]} - JD Bella Arte`;
    img.loading = 'lazy';
    
    productCard.appendChild(img);
    
    // Adicionar listener para abrir o detalhe do produto (futuro)
    productCard.addEventListener('click', function() {
      window.open(`https://wa.me/5541996390108?text=Olá,%20gostaria%20de%20informações%20sobre%20este%20produto%20da%20categoria%20${encodeURIComponent(categoryNames[category])}`, '_blank');
    });
    
    categoryProductsContainer.appendChild(productCard);
  });
  
  // Mostrar seção de produtos e esconder grid de categorias
  categoryProductsSection.style.display = 'block';
  categoryGrid.style.display = 'none';
  
  // Reobservar elementos para animação
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  const newAnimateElements = document.querySelectorAll('#category-products .animate-on-scroll');
  newAnimateElements.forEach(element => {
    observer.observe(element);
  });
  
  // Scroll para o topo da seção
  setTimeout(() => {
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// Função para obter URLs de imagens para uma categoria
function getImageUrlsForCategory(category) {
  // Esta função retornará um array de URLs de imagens baseado na categoria
  // No mundo real, isto seria feito por uma chamada AJAX ao servidor
  
  // Para este exemplo, usaremos dados estáticos baseados nas pastas que encontramos
  const imagesByCategory = {
    'prateleiras': [
      'assets/images/catalogo/prateleiras/13e6277d-bb78-4899-84b8-b01a668df9c5.jpg',
      'assets/images/catalogo/prateleiras/2dd5e6cf-8ba8-4dd7-8fac-32dafb35e7b5.jpg',
      'assets/images/catalogo/prateleiras/2e2c94ea-1914-4e39-ac6a-fe173d940adf.jpg',
      'assets/images/catalogo/prateleiras/3189d1a7-85fb-4a04-90e3-295bee92f1b3.jpg',
      'assets/images/catalogo/prateleiras/45ae1ddd-3850-4eb2-b55f-2e8b71c08a73.jpg',
      'assets/images/catalogo/prateleiras/821686c5-c55a-4595-9630-35a7810c2d34.jpg',
      'assets/images/catalogo/prateleiras/84d7de07-4d15-421f-a89b-2dfefd80195d.jpg',
      'assets/images/catalogo/prateleiras/b87d0411-935f-47dc-98ed-030dfd0a9b6e.jpg'
    ],
    'camas': [
      'assets/images/catalogo/camas/5a34c591-99cf-47a8-a474-ed518f8da6ce.jpg',
      'assets/images/catalogo/camas/a837a064-e960-4d68-bafe-c5168a20a80d.jpg',
      'assets/images/catalogo/camas/e7e35ab8-a5fd-442c-87f4-febadae630be.jpg',
      'assets/images/catalogo/camas/ec14fcd7-e734-437b-929e-5d7e1fd32f34.jpg'
    ],
    'moveis-festas': [
      'assets/images/catalogo/moveis-festas/1b25e549-bf7b-47d9-a354-406ce52dc7f4.jpg',
      'assets/images/catalogo/moveis-festas/2d2ea551-f70f-47e5-9738-207d59b501ac.jpg',
      'assets/images/catalogo/moveis-festas/35e01a9e-8a9c-42ee-a21f-b31e007d6db9.jpg',
      'assets/images/catalogo/moveis-festas/6f7e0c0c-7f20-4514-9426-8317822ba34a.jpg',
      'assets/images/catalogo/moveis-festas/7557c0e7-9ea6-4c6a-90f9-03e9edcecff5.jpg',
      'assets/images/catalogo/moveis-festas/8c12f9c4-a849-4d20-95ba-be9747f4b3b6.jpg',
      'assets/images/catalogo/moveis-festas/9c03c5fe-e903-4a82-a20a-0f994c054d8f.jpg',
      'assets/images/catalogo/moveis-festas/aa06aa9f-ca98-417a-974d-81fc6c1d108f.jpg',
      'assets/images/catalogo/moveis-festas/afaf0c95-98ac-4ab3-a203-6a326b59dab0.jpg',
      'assets/images/catalogo/moveis-festas/ed9dfd7f-799a-4e1c-bddc-656d24277ff1.jpg',
      'assets/images/catalogo/moveis-festas/f57d3dd7-538c-48a9-9db3-54344f98cf0f.jpg'
    ],
    'conjuntos': [
      'assets/images/catalogo/conjuntos/481cb5d7-5aa1-4923-b365-33b40db78e00.jpg',
      'assets/images/catalogo/conjuntos/4f3e5930-80da-455f-b7cc-6973405642a4.jpg',
      'assets/images/catalogo/conjuntos/5881ec4a-1872-4486-a9ae-0533eacc06be.jpg',
      'assets/images/catalogo/conjuntos/68c52739-8225-4617-b258-f6e3deca7c74.jpg',
      'assets/images/catalogo/conjuntos/7675db3f-5505-4d17-8a5d-a00415d5b8d2.jpg',
      'assets/images/catalogo/conjuntos/7bf026b7-8724-44da-97b3-7ccfdc4fcb0c.jpg',
      'assets/images/catalogo/conjuntos/9a8b0051-b42d-46ba-b5bb-d85924ac82d7.jpg',
      'assets/images/catalogo/conjuntos/cd106a0c-1975-4b01-9cd4-7eb60e17a2d6.jpg',
      'assets/images/catalogo/conjuntos/d97e17f4-edcb-44b6-9556-70abff95a5af.jpg',
      'assets/images/catalogo/conjuntos/e156d157-54fd-42d1-a733-336aba22992a.jpg',
      'assets/images/catalogo/conjuntos/e2fa9965-33e2-46bb-896e-29ca383f4693.jpg',
      'assets/images/catalogo/conjuntos/f4a06710-9e87-4acc-ad20-17d6d85763f0.jpg'
    ],
    'estantes': [
      'assets/images/catalogo/estantes/2a84f2f2-4574-454a-b6f2-b16b4a796f1d.jpg',
      'assets/images/catalogo/estantes/3427e790-d8a2-4730-8b6c-6373cf3496b0.jpg',
      'assets/images/catalogo/estantes/4cc45f10-18ad-436d-b094-28b30513c32e.jpg',
      'assets/images/catalogo/estantes/4f16c465-1781-4f97-a2c5-8fd612882c0b.jpg',
      'assets/images/catalogo/estantes/54aff44a-c2b5-482d-94fa-fa3b0e59f014.jpg',
      'assets/images/catalogo/estantes/60bea037-7725-4ac1-a740-a987a80bf702.jpg',
      'assets/images/catalogo/estantes/6892fe0a-6927-42a9-84fd-aaa32779f992.jpg',
      'assets/images/catalogo/estantes/7e23e4b9-19be-40cc-983a-be51ea7f0246.jpg',
      'assets/images/catalogo/estantes/efc5de72-a1c3-48e6-8a68-c81c84d93313.jpg'
    ],
    'aparadores': [
      'assets/images/catalogo/aparadores/20560723-c9f2-45c5-ac69-7938f4e0b994.jpg',
      'assets/images/catalogo/aparadores/41e14edd-1f8b-4919-a899-a52e7805cf82.jpg',
      'assets/images/catalogo/aparadores/4655586e-1f30-4ad7-b897-8233608b8a87.jpg',
      'assets/images/catalogo/aparadores/8e21a3af-df42-41be-a16c-ff3071f5a693.jpg',
      'assets/images/catalogo/aparadores/9dd4a3d4-9879-432d-a749-afb380365419.jpg',
      'assets/images/catalogo/aparadores/bc34ea60-d705-42e8-8c27-999aca8b56b0.jpg',
      'assets/images/catalogo/aparadores/ddf65116-875a-4c84-b43e-c221b9c0a12f.jpg'
    ],
    'banquetas': [
      'assets/images/catalogo/banquetas/030ef201-fb65-467a-a7cf-87be23baa2d2.jpg',
      'assets/images/catalogo/banquetas/11de294c-5bec-47b1-9ca5-86d339890885.jpg',
      'assets/images/catalogo/banquetas/2d434c91-7187-459b-8882-991e821f27f3.jpg',
      'assets/images/catalogo/banquetas/404efb20-f1af-462b-ba56-d629ea0d7f70.jpg',
      'assets/images/catalogo/banquetas/52024b9a-f83e-45e9-aef1-5d02e7a64c04.jpg',
      'assets/images/catalogo/banquetas/6a200781-08ce-46bc-9150-04299028b1fc.jpg',
      'assets/images/catalogo/banquetas/7d9b5d0a-3398-4409-ae87-b2e3d56fcbb0.jpg',
      'assets/images/catalogo/banquetas/97d09a83-d5a7-4f5a-a495-40b91d6ee3df.jpg',
      'assets/images/catalogo/banquetas/c9600160-8523-4f4b-827c-44a3674fa44b.jpg',
      'assets/images/catalogo/banquetas/e4ecf936-11fb-47d9-a1f4-6821f2fa2379.jpg'
    ],
    'areas-externas': [
      'assets/images/catalogo/areas-externas/36e6a54b-c3ee-4fe5-986a-1fb5b0964666.jpg',
      'assets/images/catalogo/areas-externas/4ace0604-c25b-4854-b4de-eb1ed6de81d5.jpg',
      'assets/images/catalogo/areas-externas/57b766d0-76ad-4a44-b516-6db406c5b222.jpg',
      'assets/images/catalogo/areas-externas/bd5f4e3a-19b2-43cc-8df0-1abda1979c36.jpg',
      'assets/images/catalogo/areas-externas/c5a564be-1bbd-43bd-9dba-150578e20662.jpg',
      'assets/images/catalogo/areas-externas/d4ea3d88-233b-4e01-8e2e-951f8096d843.jpg',
      'assets/images/catalogo/areas-externas/ee1f3684-39c7-402e-aa55-a36f76247537.jpg',
      'assets/images/catalogo/areas-externas/f03228f8-0519-4cf6-8b20-6b3ae8edb87d.jpg'
    ],
    'moveis-sob-medida': [
      'assets/images/catalogo/moveis-sob-medida/119a0e2d-1702-4ccd-9d31-b50b68b0dc56.jpg',
      'assets/images/catalogo/moveis-sob-medida/34d25574-c1cd-4b7c-b783-298c77fe2dc0.jpg',
      'assets/images/catalogo/moveis-sob-medida/37f80be1-0aca-4f80-9d4e-e2b7f9c27c92.jpg',
      'assets/images/catalogo/moveis-sob-medida/558d4bd2-61fe-487d-a017-5becf05db4ba.jpg',
      'assets/images/catalogo/moveis-sob-medida/7a0281e4-495e-4d33-8aef-e4373b76f564.jpg',
      'assets/images/catalogo/moveis-sob-medida/9d20b9b0-aef7-435c-9779-a6a9e5ccfa41.jpg',
      'assets/images/catalogo/moveis-sob-medida/b6ef1bc2-d30e-45fa-99c3-40b5856fa7b9.jpg',
      'assets/images/catalogo/moveis-sob-medida/c10e7e0b-8adf-4dda-8c5b-998f5845abb1.jpg',
      'assets/images/catalogo/moveis-sob-medida/c3ffa299-77e4-463e-b6f5-f3510ee26b7e.jpg',
      'assets/images/catalogo/moveis-sob-medida/cfcc0c49-d793-4546-8b1b-2255ff2a1e02.jpg',
      'assets/images/catalogo/moveis-sob-medida/d0f5ef06-a3d3-46d1-a062-43a7f2862b1c.jpg',
      'assets/images/catalogo/moveis-sob-medida/d19b2e1c-93ad-4d22-a295-d80ac3fb960e.jpg',
      'assets/images/catalogo/moveis-sob-medida/ea863e40-3230-4010-8219-d8e3f7393c57.jpg'
    ],
    'chales-modulares': [
      'assets/images/catalogo/chales-modulares/1ff9cd9e-7642-4ca6-88aa-4836d9ec4329.jpg',
      'assets/images/catalogo/chales-modulares/64e4af71-a0d9-48c7-a96e-0bc4a7aee639.jpg',
      'assets/images/catalogo/chales-modulares/702b2da1-16b9-46a7-bcd9-2e819facfe33.jpg',
      'assets/images/catalogo/chales-modulares/a9de9113-08d5-4258-91ce-610e5e031064.jpg',
      'assets/images/catalogo/chales-modulares/dd646b68-8f0d-43de-aaa5-0ef53f4fe68c.jpg'
    ]
  };
  
  return imagesByCategory[category] || [];
}

// Botão para voltar às categorias
document.addEventListener('DOMContentLoaded', function() {
  const voltarCategoriasBtn = document.getElementById('voltar-categorias');
  if(voltarCategoriasBtn) {
    voltarCategoriasBtn.addEventListener('click', function() {
      const categoryProductsSection = document.getElementById('category-products');
      const categoryGrid = document.querySelector('.category-grid');
      
      // Esconder seção de produtos e mostrar grid de categorias
      categoryProductsSection.style.display = 'none';
      categoryGrid.style.display = 'grid';
    });
  }
});
