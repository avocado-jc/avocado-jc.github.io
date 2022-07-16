const booksOT = {
    'genesis':'50',
    'exodus':'40',
    'leviticus':'27',
    'numbers':'36',
    'deuteronomy':'34',
    'joshua':'24',
    'judges':'21',
    'ruth':'4',
    '1 samuel':'31',
    '2 samuel':'24',
    '1 kings':'22',
    '2 kings':'25',
    '1 chronicles':'29',
    '2 chronicles':'36',
    'ezra':'10',
    'nehemiah':'13',
    'esther':'10',
    'job':'42',
    'psalms':'150',
    'proverbs':'31',
    'ecclesiastes':'12',
    'song of songs':'8',
    'isaiah':'66',
    'jeremiah':'52',
    'lamentations':'5',
    'ezekiel':'48',
    'daniel':'12',
    'hosea':'14',
    'joel':'3',
    'amos':'9',
    'obadiah':'1',
    'jonah':'4',
    'micah':'7',
    'nahum':'3',
    'habakkuk':'3',
    'zephaniah':'3',
    'zechariah':'14',
    'malachi':'4'
}

// let book = document.querySelector("#book")
// let chapter = document.querySelector("#chapter")


let otReader = document.querySelector('#ot-reader')


const otInputDiv = document.querySelector("#ot-input")
// bibleReader.appendChild(inputDiv)
let otBook = document.createElement('select')
label = document.createElement('label')
label.innerText = "Select a Book to Read"
otBook.appendChild(label)
otBook.setAttribute('id','ot-book')
let otChapterNum
blank = document.createElement("option")
blank.innerText = ''
otBook.appendChild(blank)

for (key in booksOT) {
    otBookName = document.createElement("option")
    otBookName.innerText = key
    otBook.appendChild(otBookName)
}
otInputDiv.appendChild(otBook)
let otChapter = ''
otBook.addEventListener('change', function() {
    otChapter = document.createElement('select')
    otChapter.setAttribute("id","ot-chapter")
    otButton = document.querySelector('#ot-button')
    otButton.addEventListener('click', function() {
        if (otChapter != '') {
            otChapter = document.querySelector("#ot-chapter")
            // alert(chapter)
            otChapter.remove()
        }
        
    })

    // book.setAttribute('type', 'select')
    otInputDiv.appendChild(otChapter)
    let otChapterRange = booksOT[otBook.value]
    // alert(chapterRange)
    for (i=1; i <= otChapterRange; i++) {
        otChapterNum = document.createElement('option')
        otChapterNum.innerText = i
        otChapter.appendChild(otChapterNum)
        
    }
    
})

const vm_ot = new Vue({
    el: "#app-ot",
    data: {
        otBibleVerses: {}
    },
    methods: {
        loadOTVerses: function() {
            axios({
                method: 'get',
                url: 'https://bible-api.com/'+otBook.value+'+'+otChapter.value

            }).then(response => {
                this.otBibleVerses = response.data
                console.log(this.otBibleVerses.reference)
            }).catch(error => {
                alert("ERROR: Make sure to select a book, and then select a chapter number from dropdown lists")
                console.log(error)
                console.log(error.response.data)
            })
        }
    }
})