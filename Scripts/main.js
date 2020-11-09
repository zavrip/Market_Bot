$(document).ready(function(){
    $(".chat_on").click(function(){
        $(".Layout").toggle();
        $(".chat_on").hide(300);
    });
    
       $(".chat_close_icon").click(function(){
        $(".Layout").hide();
           $(".chat_on").show(300);
    });
    
});

 let allQuestions = []
 const submit = document.querySelector('#send_button')
 submit.addEventListener('click', async () => {

    let userInput = document.querySelector('#input_field').nodeValue
    
    let answers = await processAnswer(userInput) 

    console.log(answers)

    let msgbox = document.querySelector("#Messages_List")

    msgbox.innerHTML += `
    <div class="q_a_contanier">
        <url class="question">${userInput}</url>
        <url class="answer">${answers}</url>
    </div>`

})

async function processAnswer(question) {

    let answers = await fetch('data.json')
    .then(resp => resp.json ())
    .then(data => {

        let allWords = question.split(' ') 

        console.log(allWords) 

        let allQuestions = data.filter(d => {
            console.log(d.question.indexOf(question))
            return d.question.indexOf(question) > -1
        })

        const answers = allQuestions[0] != null ? allQuestions[0].answer.map(a => `<li>${a}</li>`).join("") :
        "<li>No Answer</li>"

        return `${answers}`
    })

    return answers
}
