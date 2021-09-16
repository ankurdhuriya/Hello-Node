const express = require('express');
const app = express();
var cors = require('cors');

const port = process.env.PORT || 3000;
function convert_to_unicode(input_text) {

    var text_array = new Array(
        " û", " ।",// purnacheda
        "ö", " ।",// purnacheda
        "÷÷÷", "",//
        // double accented - AkrutiOriSarala
        "£", "୍ମ",// ma phala
        "à", "୍ମ",// ma phala
        "á", "୍ମୃ",// (halanta)m-Rû
        "â", "୍ର",// ra
        "ã", "୍ର",// reph
        "ä", "୍ଲ",// la phala
        "å", "୍ଭ",// halanta- bha
        "æ", "୍ଳ",// halanta-La
        "ç", "୍ୱ",// ba phala
        "è", "୍ସ",// halanta-sa
        "ý", "୍ୟ",// ja phala
        "¥", "୍ୟ",// ja phala
        "ó", "ିଁ",// i kara

        "Iß", "ୱ",//wa
        "Wÿ", "ଡ଼",// Da with bindu
        "Xÿ", "ଢ଼",// Dha with bindu
        "Pÿ", "ଚ",// c
        "[ô", "ଥି",// thi
        "]ô", "ଧି",// dhi
        "Lô", "ଖି",// khi
        "cô", "ତ୍ମ",// tma
        "_ô", "ତ୍ପ",// tma

        "û", "ା",// aa kara
        "ò", "ି",// i kara
        "ú", "ୀ",// dirgha i kara
        "ê", "ୁ",// u kara
        "ë", "ୁ",// u kara
        "ì", "ୂ",// dirgha i kara
        "í", "ୂ",// dirgha u kara
        "é", "ୃ",// ru kara

        "ñ", "ଁ",// chandrabindu
        "õ", "ଂ",// anuswara
        "ü", "ଃ",// bisarga
        "þ", "୍",//halanta
        "¨", "୍‌",// halanta with zero width non-joiner
        //"¨", "୍‍" , // halanta with zero width joiner
        "1", "୧",// Numeric 1
        "2", "୨",// Numeric 2
        "3", "୩",// Numeric 3
        "4", "୪",// Numeric 4
        "5", "୫",// Numeric 5
        "6", "୬",// Numeric 6
        "7", "୭",// Numeric 7
        "8", "୮",// Numeric 8
        "9", "୯",// Numeric 9
        "0", "୦",// Numeric 10
        "#", "୰",// late
        "$", "ଽ", "&", "ଌ",// lu
        "*", "ଞ୍ଚ",// nc
        " ", "ଞ୍ଚ",// nc
        "î", "୍ରୁ",// halanta-r-u
        "ï", "୍ରୂ",// halanta-r-dirgha u

        "Ð", "କ୍ଷ୍ଣ",// khya-N
        "Ñ", "୍କ",// halanta-k
        "Ò", "୍ଖ",// halanta-kh
        "Ó", "୍ଗ",// halanta-g
        "Ô", "୍ଚ",// halanta-c
        "Õ", "୍ଜ",// halanta-j
        "Ö", "୍ଟ",// halanta-T
        "×", "୍ଠ",// halanta-Th
        "Ø", "୍ଡ",// halanta-D
        "Ù", "୍ଣ",// halanta-N
        "Ú", "୍ଥ",// halanta-th
        "Û", "୍ଧ",// halanta-dh
        "Ü", "୍ନ",// halanta-n
        "Ý", "୍ପ",// halanta-p
        "Þ", "୍ଫ",// halanta-ph
        "ß", "୍ୱ",// halanta-b

        "<", "ଣ୍ଟ",// NT
        " ", "ଣ୍ଟ",// NT
        "…", "ଟ୍ଟ",// TT
        "μ", "ମ୍ପ",// mp
        "µ", "ମ୍ପ",// mp
        "¶", "ମ୍ଫ",// mph
        "‰", "ଣ୍ଣ",// NN
        "Š", "ଣ୍ଡ",// ND

        "Œ", "ଣ୍ଠ",// NTh
        "™", "ତ୍ମ",// tm
        "š", "ତ୍ପ",// tp
        "›", "ତ୍ସ",// ts
        "œ", "ତ୍ସ୍ନ",// t-s-n
        "Ÿ", "ଦ୍ଦ",// d-dh

        "{", "ଜ୍ଜ",// jj
        "|", "ଜ୍ଝ",// j-jh
        "}", "କ୍ର",// kr

        "¡", "ଦ୍ଧ",// d-dh
        "¢", "ଦ୍ଘ",// d-gh
        "¤", "ଧ୍ୟ",// dhya
        "¦", "ନ୍ଦ",// nd
        "§", "ନ୍ଧ",// ndh
        "©", "ତ୍ତ",// tt
        " ", "ତ୍ତ",// tt
        "ª", "ନ୍ତ୍ର",// ntr (jantra)
        "«", "ନ୍ତ",// nt
        "¬", "ଞ୍ଜ",// nj
        "ƒ", "ଞ୍ଝ",// njh
        "®", "ପ୍ପ",// pp
        "¯", "ପ୍ତ",// pt

        "°", "ପ୍ସ",// ps
        "±", "ବ୍ଦ",// bd
        "²", "ବ୍ଧ",// bdh
        "´", "ମ୍ବ",// mb
        "¸", "ମ୍ଭ",// mbh
        " ̧", "ମ୍ଭ",// ***mbha
        "̧", "ମ୍ଭ",// mbha
        "¹", "ମ୍ମ",// mm
        "º", "ଲ୍କ",// lk
        "»", "ଲ୍ଗ",// lg
        "¼", "ଶ୍ଛ",// Nch
        "½", "ଶ୍ଚ",// S-ch (talabya sa - ca)
        "¾", "ଷ୍ଣ",// sh-N (murdhanya sa - Na)
        "¿", "ଷ୍ପ",// sh-p (murdhanya sa - pa)

        "À", "ଷ୍ଫ",// sh-ph (murdhanya sa - pha)
        "Á", "ଷ୍ଟ",// sh-T (murdhanya sa - Ta)
        "Â", "ଷ୍ଠ",// sh-Th (murdhanya sa - Tha)
        "Ã", "ଷ୍କ",// sh-k (murdhanya sa - ka)
        "Ä", "ସ୍କ",// s-k
        "Å", "ସ୍ଖ",// sh-kh
        "Æ", "ସ୍ପ",// sp
        "Ç", "ସ୍ଫ",// sph
        "È", "ସ୍ତ୍ର",// str
        "É", "ସ୍ତ",// st
        "Ê", "ସ୍ୱ",// sb
        "Ë", "ଳ୍କ",// lk
        "Ì", "ଳ୍ପ",// Lp
        "Í", "ଳ୍ଫ",// Lph
        "Î", "ତ୍ଥ",// t-th
        " ", "ତ୍ଥ",// t-th
        "Ï", "ଳ୍ଳ",// L-L

        "@ା", "ଆ",// aa
        "@", "ଅ",// a
        "A", "ଇ",// i
        "B", "ଈ",// dirgha i
        "C", "ଉ",// u
        "D", "ଊ",// dirgha u
        "E", "ଋ",// R
        "F", "ୠ",// RR
        "G", "ଏ",// e
        "H", "ଐ",// ai
        "I", "ଓ",// o
        "J", "ଔ",// au 

        "K", "କ",// k
        "L", "ଖ",// kh
        "M", "ଗ",// g
        "N", "ଘ",// gh
        "O", "ଙ",
        "P", "ଚ",// c
        "Q", "ଛ",// ch
        "R", "ଜ",// j
        "S", "ଝ",// jh
        "T", "ଞ",// Nya

        "U", "ଟ",// T
        "V", "ଠ",// Th
        "W", "ଡ",// D
        "X", "ଢ",// Dh
        "Y", "ଣ",// N
        "Z", "ତ",// t
        "[", "ଥ",// th
        "\\", "ଦ",// d
        "]", "ଧ",// dh
        "^", "ନ",// n
        "~", "ଯ",// y
        "_", "ପ",// p
        "`", "ଫ",// ph
        "a", "ବ",// b
        "b", "ଭ",// bh
        "c", "ମ",// m
        "d", "ୟ",// y
        "e", "ର",// r
        "f", "ଲ",// l
        "g", "ଶ",// S (talabya sa)
        "h", "ଷ",// sh (murdhanya sa)
        "i", "ସ",// s
        "j", "ହ",// h
        "k", "ଳ",// L
        "l", "କ୍ଷ",// ksh
        "m", "ଜ୍ଞ",// gya
        "n", "ଦ୍ଭ",// d-bh
        "o", "କ୍ଟ",// kT
        "p", "କ୍ଟ୍ର",// kTr
        "q", "କ୍ତ",// kt
        "r", "କ୍ସ",// ks
        "s", "ଗ୍ଦ",// gd
        "t", "ଗ୍ଧ",// gdh
        "u", "ଙ୍କ", "v", "ଙ୍ଖ", "w", "ଙ୍ଗ", "x", "ଙ୍ଘ", "y", "ଚ୍ଚ", "z", "ଚ୍ଛ", " ̄", "ପ୍ତ", " ́", "ମ୍ବ", "‹", "ଣ୍ଢ",// ndha
        "ଏø", " ଐ",// ai
        "୍ଯ", "୍ୟ",// ja phala
        " ̈", "୍‍",// halanta with ZWJ
        "ଅା", "ଆ"// aa
        //"" , "",
        //"" , ""
    )
    //**********************************************

    var text_array_length = text_array.length;

    var modified_substring = input_text;

    Replace_text();

    //document.getElementById("unicode_text").value = modified_substring;

    // --------------------------------------------------

    function Replace_text() {

        if (modified_substring != "") // if string to be converted is non-blank then no need of any processing.
        {
            for (input_symbol_idx = 0; input_symbol_idx < text_array_length - 1; input_symbol_idx = input_symbol_idx + 2) {
                //******************************************************
                idx = 0;
                // index of the symbol being searched for replacement

                while (idx != -1) //while-00
                {

                    modified_substring = modified_substring.replace(text_array[input_symbol_idx], text_array[input_symbol_idx + 1])
                    idx = modified_substring.indexOf(text_array[input_symbol_idx])

                }
                // end of while-00 loop

            }
            // end of for loop

            // following statements for adjusting position of e, ai, o and au maatraas.

            modified_substring = modified_substring.replace(/([ù])([କଖଗଘଙଚଛଜଝଞଟଠଡଡ଼ଢଢ଼ଣତଥଦଧନପଫବଭମଯୟରଲବୱଶଷସହକ୍ଷଡ଼ଳ])/g, "$2$1");
            //ଟଠଡଡ଼ଢଢ଼ଣତଥ
            modified_substring = modified_substring.replace(/([ù])([୍])([କଖଗଘଚଛଜଝଟଠଡଡ଼ଢଢ଼ଣତଥନପଫବଭମୟରଲବୱଶଷସହକ୍ଷଡ଼ଳ])/g, "$2$3$1");

            modified_substring = modified_substring.replace(/([ù])([୍])([କଖଗଘଚଛଜଝଟଠଡଡ଼ଢଢ଼ଣତଥନପଫବଭମୟରଲବୱଶଷସହକ୍ଷଡ଼ଳ])/g, "$2$3$1");

            modified_substring = modified_substring.replace(/ùø/g, "ୌ");

            modified_substring = modified_substring.replace(/ùା/g, "ୋ");

            modified_substring = modified_substring.replace(/ù÷/g, "ୈ");

            modified_substring = modified_substring.replace(/ù/g, "େ");

            //following three statement for adjusting position of reph ie, half r .
            modified_substring = modified_substring.replace(/([କଖଗଘଚଛଜଝଟଠଡଡ଼ଢଢ଼ଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହକ୍ଷଜ୍ଞୟ])([ାିୀୁୂୃେୈୋୌଂଁ]*)à/g, "ð$1$2");
            modified_substring = modified_substring.replace(/([କଖଗଘଚଛଜଝଟଠଡଡ଼ଢଢ଼ଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହକ୍ଷଜ୍ଞୟ])([ାିୀୁୂୃେୈୋୌଂଁ]*)ð/g, "ð$1$2");

            modified_substring = modified_substring.replace(/([କଖଗଘଚଛଜଝଟଠଡଡ଼ଢଢ଼ଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହକ୍ଷଜ୍ଞୟ])([୍])à/g, "ð$1$2");
            modified_substring = modified_substring.replace(/([କଖଗଘଚଛଜଝଟଠଡଡ଼ଢଢ଼ଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହକ୍ଷଜ୍ଞୟ])([୍])ð/g, "ð$1$2");

            modified_substring = modified_substring.replace(/ð/g, "ର୍");

            modified_substring = modified_substring.replace(/([ଂଁ])([ାିୀୁୂୃେୈୋୌ])/g, "$2$1");

        }
        // end of IF  statement  meant to  suppress processing of  blank  string.

    }
    // end of the function  Replace_Symbols
    return modified_substring
}
// end of convert_to_unicode function

// end of convert_to_unicode function

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {

    res.json({ responseText: 'Hello World' });
});

app.get('/user', function (req, res, next) {
    var x = req.query.x;
    // var y = req.query.y;
    var r = convert_to_unicode(x);
    // response = {
    //     result: (req.query.x) + req.query.y,
    // };
    // res.end(JSON.stringify(response));
    // var q = req.params.x
    res.json({ responseText: r });
});

app.listen(port, function () {
    console.log('Server listening on port %s', port);
});
