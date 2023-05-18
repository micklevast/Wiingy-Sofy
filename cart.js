console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}


let cartContainer = document.getElementById('cartContainer')

let boxContainerspan = document.createElement('span')
boxContainerspan.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxspan = document.createElement('span')
    boxspan.id = 'box'
    boxContainerspan.appendChild(boxspan)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxspan.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter)
    // let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxspan.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Amount: Rs' + ob.price)
    boxh4.appendChild(h4Text)
    boxspan.appendChild(boxh4)

    // console.log(boxContainerspan);

    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerspan)
    cartContainer.appendChild(totalContainerspan)
    // let cartMain = document.createElement('span')
    // cartmain.id = 'cartMainContainer'
    // cartMain.appendChild(totalContainerspan)

    return cartContainer
}

let totalContainerspan = document.createElement('span')
totalContainerspan.id = 'totalContainer'

let totalspan = document.createElement('span')
totalspan.id = 'total'
totalContainerspan.appendChild(totalspan)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Amount')
totalh2.appendChild(h2Text)
totalspan.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    // let totalh4Text = document.createTextNode(amount)
    let totalh4Text = document.createTextNode('Amount: Rs ' + amount)
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalspan.appendChild(totalh4)
    totalspan.appendChild(buttonspan)
    console.log(totalh4);
}


let buttonspan = document.createElement('span')
buttonspan.id = 'button'
totalspan.appendChild(buttonspan)

let buttonTag = document.createElement('button')
buttonspan.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = '/orderPlaced.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Place Order')
buttonTag.onclick = function()
{
    console.log("clicked")
}  
//dynamicCartSection()
// console.log(dynamicCartSection());

// BACKEND CALL
let httpRequest = new XMLHttpRequest()
let totalAmount = 0
httpRequest.onreadystatechange = function()
{
    if(this.readyState === 4)
    {
        if(this.status == 200)
        {
            // console.log('call successful');
            contentTitle = JSON.parse(this.responseText)

            let counter = Number(document.cookie.split(',')[1].split('=')[1])
            document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)

            let item = document.cookie.split(',')[0].split('=')[1].split(" ")
            console.log(counter)
            console.log(item)

            let i;
            let totalAmount = 0
            for(i=0; i<counter; i++)
            {
                let itemCounter = 1
                for(let j = i+1; j<counter; j++)
                {   
                    if(Number(item[j]) == Number(item[i]))
                    {
                        itemCounter +=1;
                    }
                }
                totalAmount += Number(contentTitle[item[i]-1].price) * itemCounter
                dynamicCartSection(contentTitle[item[i]-1],itemCounter)
                i += (itemCounter-1)
            }
            amountUpdate(totalAmount)
        }
    }
        else
        {
            console.log('call failed!');
        }
}

httpRequest.open('GET', "data.json", true)
httpRequest.send()




