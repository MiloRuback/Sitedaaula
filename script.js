// ============================================================
// CONFIGURAÇÃO DO SUPABASE
// ============================================================
const SUPABASE_URL = 'https://vxffjevtlknptkhhrbbp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_-QbrQHUYP1Geahd2qoGGHA_fidSPhLS';

// Inicializa o cliente Supabase (nome diferente para não conflitar)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// Elementos do DOM
// ============================================================
const form = document.getElementById('form-cadastro');
const formTitle = document.getElementById('form-title');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');
const tbody = document.getElementById('tbody-cadastros');
const tabela = document.getElementById('tabela-cadastros');
const loading = document.getElementById('loading');
const listaVazia = document.getElementById('lista-vazia');
const totalRegistros = document.getElementById('total-registros');
const toast = document.getElementById('toast');

let editandoId = null;

// ============================================================
// Funções auxiliares
// ============================================================
function mostrarToast(mensagem, tipo = 'success') {
    toast.textContent = mensagem;
    toast.className = `toast ${tipo} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function limparFormulario() {
    form.reset();
    document.getElementById('id').value = '';
    editandoId = null;
    formTitle.textContent = 'Novo Cadastro';
    btnSalvar.textContent = 'Salvar';
    btnCancelar.style.display = 'none';
}

function preencherFormulario(cadastro) {
    document.getElementById('id').value = cadastro.id;
    document.getElementById('nome').value = cadastro.nome;
    document.getElementById('email').value = cadastro.email;
    document.getElementById('telefone').value = cadastro.telefone || '';
    document.getElementById('cidade').value = cadastro.cidade || '';
    editandoId = cadastro.id;
    formTitle.textContent = 'Editar Cadastro';
    btnSalvar.textContent = 'Atualizar';
    btnCancelar.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function escapeHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// ============================================================
// CRUD - READ (Listar)
// ============================================================
async function listarCadastros() {
    loading.style.display = 'block';
    tabela.style.display = 'none';
    listaVazia.style.display = 'none';

    const { data, error } = await supabaseClient
        .from('cadastros')
        .select('*')
        .order('id', { ascending: true });

    loading.style.display = 'none';

    if (error) {
        console.error('Erro ao listar:', error);
        mostrarToast('Erro ao carregar cadastros: ' + error.message, 'error');
        return;
    }

    totalRegistros.textContent = `${data.length} registro${data.length !== 1 ? 's' : ''}`;

    if (data.length === 0) {
        listaVazia.style.display = 'block';
        return;
    }

    tabela.style.display = 'table';
    tbody.innerHTML = '';

    data.forEach(cadastro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${escapeHtml(cadastro.nome)}</td>
            <td>${escapeHtml(cadastro.email)}</td>
            <td>${escapeHtml(cadastro.telefone || '—')}</td>
            <td>${escapeHtml(cadastro.cidade || '—')}</td>
            <td>
                <button class="btn btn-edit" onclick="editarCadastro(${cadastro.id})">Editar</button>
                <button class="btn btn-delete" onclick="excluirCadastro(${cadastro.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ============================================================
// CRUD - CREATE / UPDATE
// ============================================================
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefone: document.getElementById('telefone').value.trim() || null,
        cidade: document.getElementById('cidade').value.trim() || null
    };

    btnSalvar.disabled = true;
    btnSalvar.textContent = editandoId ? 'Atualizando...' : 'Salvando...';

    let error;

    if (editandoId) {
        // UPDATE
        const resultado = await supabaseClient
            .from('cadastros')
            .update(dados)
            .eq('id', editandoId);
        error = resultado.error;
    } else {
        // CREATE
        const resultado = await supabaseClient
            .from('cadastros')
            .insert([dados]);
        error = resultado.error;
    }

    btnSalvar.disabled = false;

    if (error) {
        console.error('Erro ao salvar:', error);
        mostrarToast('Erro: ' + error.message, 'error');
        btnSalvar.textContent = editandoId ? 'Atualizar' : 'Salvar';
        return;
    }

    mostrarToast(editandoId ? 'Cadastro atualizado com sucesso!' : 'Cadastro criado com sucesso!');
    limparFormulario();
    listarCadastros();
});

// ============================================================
// CRUD - UPDATE (preparar formulário)
// ============================================================
async function editarCadastro(id) {
    const { data, error } = await supabaseClient
        .from('cadastros')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        mostrarToast('Erro ao buscar cadastro: ' + error.message, 'error');
        return;
    }

    preencherFormulario(data);
}

// ============================================================
// CRUD - DELETE
// ============================================================
async function excluirCadastro(id) {
    if (!confirm('Tem certeza que deseja excluir este cadastro?')) return;

    const { error } = await supabaseClient
        .from('cadastros')
        .delete()
        .eq('id', id);

    if (error) {
        mostrarToast('Erro ao excluir: ' + error.message, 'error');
        return;
    }

    mostrarToast('Cadastro excluído com sucesso!');
    listarCadastros();
}

// ============================================================
// Eventos
// ============================================================
btnCancelar.addEventListener('click', limparFormulario);

// Carrega a lista ao abrir a página
listarCadastros();
