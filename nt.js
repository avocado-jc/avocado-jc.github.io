// let book = document.querySelector("#book")
// let chapter = document.querySelector("#chapter")
// let chapter

let ntReader = document.querySelector('#nt-reader')

const booksNT = {
    'matthew':'28',
    'mark':'16',
    'luke':'24',
    'john':'21',
    'acts':'28',
    'romans':'16',
    '1 corinthians':'16',
    '2 corinthians':'13',
    'galatians':'6',
    'ephesians':'6',
    'phillipians':'4',
    'collossians':'4',
    '1 thessalonians':'5',
    '2 thessalonians':'3',
    '1 timothy':'6',
    '2 timothy':'4',
    'titus':'3',
    'philemon':'1',
    'hebrews':'13',
    'james':'5',
    '1 peter':'5',
    '2 peter':'3',
    '1 john':'5',
    '2 john':'1',
    '3 john':'1',
    'jude':'1',
    'revelation':'22'
}

const translations = {
    'king james bible':'?translation=kjv',
    'bible in basic english':'?translation=bbe',
    'world english bible':'',
    'open english bible, commonwealth edition':'?translation=oeb-cw',
    'world english bible, british edition':'?translation=webbe',
    'open english bible, US edition':'?translation=oeb-us',
    'joao ferreira de almeida':'?translation=almeida',
    'protestant romanian correct cornilescu version':'?translation=rccv'
}

const ntInputDiv = document.querySelector("#nt-input")
// bibleReader.appendChild(inputDiv)
let ntBook = document.createElement('select')
label = document.createElement('label')
label.innerText = "Select a Book to Read"
ntBook.appendChild(label)
ntBook.setAttribute('id','nt-book')
let ntChapterNum
blank = document.createElement("option")
blank.innerText = ''
ntBook.appendChild(blank)

for (key in booksNT) {
    ntBookName = document.createElement("option")
    ntBookName.innerText = key
    ntBook.appendChild(ntBookName)
}
ntInputDiv.appendChild(ntBook)
let ntChapter 
let ntTranslation
let ntChapterRange
let ntTranslations
ntBook.addEventListener('change', function() {
    ntChapter = document.createElement('select')
    ntChapter.setAttribute("id","nt-chapter")
    ntButton = document.querySelector('#nt-button')
    ntButton.addEventListener('click', function() {
        if (ntChapter != '') {
            ntChapter = document.querySelector("#nt-chapter")
            ntTranslations = document.querySelector('#nt-translations')
            // alert(chapter)
            ntChapter.remove()
            ntTranslations.remove()

        }
        
    })

    // book.setAttribute('type', 'select')
    ntInputDiv.appendChild(ntChapter)
    ntChapterRange = booksNT[ntBook.value]
    // alert(chapterRange)
    for (i=1; i <= ntChapterRange; i++) {
        ntChapterNum = document.createElement('option')
        ntChapterNum.innerText = i
        ntChapter.appendChild(ntChapterNum)
        // ntChapterNum = ntChapter.value
    }
    ntTranslations = document.createElement('select')
    ntTranslations.setAttribute('id','nt-translations')
    ntInputDiv.appendChild(ntTranslations)
    for (key in translations) {
        ntTranslation = document.createElement('option')

        ntTranslation.innerText = key

        ntTranslations.appendChild(ntTranslation)
    }
    
})





const vm_nt = new Vue({
    el: "#app-nt",
    data: {
        ntBibleVerses: {}
    },
    methods: {
        loadNTVerses: function() {
            axios({
                method: 'get',
                url: 'https://bible-api.com/'+ntBook.value+'+'+ntChapter.value+translations[ntTranslations.value]

            }).then(response => {
                this.ntBibleVerses = response.data
                console.log(this.ntBibleVerses.reference)
            }).catch(error => {
                alert("ERROR: Make sure to select a book, and then select a chapter number from dropdown lists")
                console.log(error)
                console.log(error.response.data)
            })
        }
    }
})