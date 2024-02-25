function controlarDropdown() {

  //animação de subir/descer aparecer/desaparecer das bandeirinhas

  const ul = document.getElementsByClassName('headerFlagsDropdown')[0];
  const i = document.getElementsByClassName('headerFlagsArrow')[0];
  if (ul.style.opacity === '0' || ul.style.opacity === '') {
    ul.style.marginTop = '80px';
    ul.style.opacity = '1';
    i.style.rotate = '180deg';
  } else {
    ul.style.marginTop = '-160px';
    ul.style.opacity = '0';
    i.style.rotate = '0deg';
  }
}

function criarCookieIdioma( valor ) {

  //gerando cookie de 30 dias com valor do idioma escolhido pelo user

  var data = new Date();
  data.setTime(data.getTime() + (30 * 24 * 60 * 60 * 1000));
  var expires = "expires="+data.toUTCString();
  document.cookie = "lang=" + valor + ";" + expires + ";path=/";
  location.reload();

}

$(document).ready(function(){
  function atualizarIdiomaAutomaticamente() {

    //pegando cookies e procurando "lang=" neles, se não achar, retorna nada

    var nomeIgual = "lang=";
    var cookies = decodeURIComponent(document.cookie).split(';');
    for(var i = 0; i < cookies.length; i++) {

      var cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        
          cookie = cookie.substring(1);
          
      }
      if (cookie.indexOf(nomeIgual) == 0) {

        //achou o "lang=" agora vai chamar a função que traduz a página de acordo com o valor do cookie

        var lang = cookie.substring(nomeIgual.length, cookie.length);
        switch (lang) {

          case "us":

            $('#first').attr('src', 'assets/flag-us.png');
            $('#second').attr('src', 'assets/flag-br.png');
            return us();
            break;

          case "jp":

            $('#first').attr('src', 'assets/flag-jp.png');
            $('#third').attr('src', 'assets/flag-br.png');
            return jp();
            break;

          case "br":

            //apaga o cookie, pois português é o idioma padrão ao entrar na página
                    
            return document.cookie = "lang=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            break;

          default:
                    
            console.log("País não reconhecido");

        }

      }
    }
    return "";
  }

  atualizarIdiomaAutomaticamente(); //chama a função toda vez que entrar na página

  
  const canvas = document.getElementById('canv');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  let cols = Math.floor(window.innerWidth / 20) + 1;
  let ypos = Array(cols).fill(0);

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  function matrix () {
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    if (canvas.width !== w) {
      canvas.width = w;
      cols = Math.floor(window.innerWidth / 20) + 1;
      ypos = Array(cols).fill(0);
    }
    if (canvas.height !== h) {
      canvas.height = h;
    }

    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#f7aa24';
    ctx.font = '14pt monospace';

    ypos.forEach((y, ind) => {
      const katakanaChars = [
        'ア', 'イ', 'ウ', 'エ', 'オ',
        'カ', 'キ', 'ク', 'ケ', 'コ',
        'ラ', 'リ', 'ル', 'レ', 'ロ',
        'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
        'タ', 'チ', 'ツ', 'テ', 'ト',
        'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
        'マ', 'ミ', 'ム', 'メ', 'モ',
        'サ', 'シ', 'ス', 'セ', 'ソ',
        'ヤ', 'ヨ', 'ユ',
        'ワ', 'ヲ', 'ン',
      ];
      const randomIndex = Math.floor(Math.random() * katakanaChars.length);
      const katakanaChar = katakanaChars[randomIndex];
      const text = katakanaChar;
      const x = ind * 20;
      ctx.fillText(text, x, y);
      if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
      else ypos[ind] = y + 20;
    });
  }

  setInterval(matrix, 50);
})