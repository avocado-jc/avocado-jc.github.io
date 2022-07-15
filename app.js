// let book = document.querySelector("#book")
// let chapter = document.querySelector("#chapter")
// let chapter

let bibleReader = document.querySelector('#bible-reader')

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

const inputDiv = document.querySelector("#input")
// bibleReader.appendChild(inputDiv)
let book = document.createElement('select')
label = document.createElement('label')
label.innerText = "Select a Book to Read"
book.appendChild(label)
book.setAttribute('id','book')
let chapterNum
blank = document.createElement("option")
blank.innerText = ''
book.appendChild(blank)

for (key in booksNT) {
    bookName = document.createElement("option")
    bookName.innerText = key
    book.appendChild(bookName)
}
inputDiv.appendChild(book)
let chapter = ''
book.addEventListener('change', function(chapter) {
    chapter = document.createElement('select')
    chapter.setAttribute("id","chapter")
    button = document.querySelector('#button')
    button.addEventListener('click', function() {
        if (chapter != '') {
            chapter = document.querySelector("#chapter")
            // alert(chapter)
            chapter.remove()
        }
        
    })

    // book.setAttribute('type', 'select')
    inputDiv.appendChild(chapter)
    chapterRange = booksNT[book.value]
    // alert(chapterRange)
    for (i=1; i <= chapterRange; i++) {
        chapterNum = document.createElement('option')
        chapterNum.innerText = i
        chapter.appendChild(chapterNum)
        chapterNum = chapter.value
    }
})

const vm = new Vue({
    el: "#app",
    data: {
        bibleVerses: {}
    },
    methods: {
        loadVerses: function() {
            axios({
                method: 'get',
                url: 'https://bible-api.com/'+book.value+'+'+chapterNum

            }).then(response => {
                this.bibleVerses = response.data
                console.log(this.bibleVerses.reference)
            }).catch(error => {
                alert("ERROR: Make sure to select a book, and then select a chapter number from dropdown lists")
                console.log(error)
                console.log(error.response.data)
            })
        }
    }
})