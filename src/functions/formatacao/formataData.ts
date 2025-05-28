export function formataData(data) {
    if (!data) {
        return '';
    }
    const dataCompleta = new Date(data);
    
    var dataQuebrada = dataCompleta.toISOString().slice(0, 10);
    var novaData = dataQuebrada.split('-')

    var dia = novaData[2];
    var mes = novaData[1];
    var ano = novaData[0];
    
    var dataAtualizada = [dia, mes, ano].join('/');

    return dataAtualizada;
}