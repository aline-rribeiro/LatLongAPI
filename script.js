function buscarEndereco() {
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;

    if (!lat || !lon) {
        document.getElementById('resultado').textContent = "Por favor, insira latitude e longitude.";
        return;
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    if (isNaN(lat) || isNaN(lon)) {
        resultado.textContent = "Latitude e longitude devem ser números.";
        return;
    }

    fetch(url, {
        headers: {
            "User-Agent": "sistema-suporte-v1",
            "Accept-Language": "pt-BR"
        }
    })
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error('Não foi possível localizar');
            }
            return resposta.json();
        })
        .then(data => {
            if (data.error) {
                document.getElementById('resultado').innerHTML = 'Endereço não encontrado';
            } else {
                document.getElementById('resultado').innerHTML = `
                        <p>Rua: ${data.address.road}</p>
                        <p>Bairro: ${data.address.suburb}</p>
                        <p>Cidade: ${data.address.city}</p>
                        <p>CEP: ${data.address.postcode}</p>
                        <p>Estado: ${data.address.state}</p>
                        <p>País: ${data.address.country}</p>`;
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById('resultado').textContent = "Erro ao buscar o endereço.";
        });
}