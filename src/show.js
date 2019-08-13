function show(content) {
    window.alert('hello' + content)
}


import('./show-child.js').then((sc)=>{
    sc('aasdasf')
})

module.exports = show

