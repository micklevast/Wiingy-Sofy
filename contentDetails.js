console.clear()

let id = location.search.split('?')[1]
console.log(id)

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('span')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionspan = document.createElement('span')
    imageSectionspan.id = 'imageSection'

    let imgTag = document.createElement('img')
     imgTag.id = 'imgDetails'
     //imgTag.id = ob.photos
     imgTag.src = ob.preview

    imageSectionspan.appendChild(imgTag)

    let productDetailsspan = document.createElement('span')
    productDetailsspan.id = 'productDetails'

    // console.log(productDetailsspan);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)
    console.log(h4);

    let detailsspan = document.createElement('span')
    detailsspan.id = 'details'

    let h3Detailsspan = document.createElement('h3')
    let h3DetailsText = document.createTextNode('Rs ' + ob.price)
    h3Detailsspan.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Description')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)

    let productPreviewspan = document.createElement('span')
    productPreviewspan.id = 'productPreview'

    let h3ProductPreviewspan = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Product Preview')
    h3ProductPreviewspan.appendChild(h3ProductPreviewText)
    productPreviewspan.appendChild(h3ProductPreviewspan)

    let i;
    for(i=0; i<ob.photos.length; i++)
    {
        let imgTagProductPreviewspan = document.createElement('img')
        imgTagProductPreviewspan.id = 'previewImg'
        imgTagProductPreviewspan.src = ob.photos[i]
        imgTagProductPreviewspan.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = ob.photos[i]
            document.getElementById("imgDetails").src = this.src 
            
        }
        productPreviewspan.appendChild(imgTagProductPreviewspan)
    }

    let buttonspan = document.createElement('span')
    buttonspan.id = 'button'

    let buttonTag = document.createElement('button')
    buttonspan.appendChild(buttonTag)

    buttonText = document.createTextNode('Add to Cart')
    buttonTag.onclick  =   function()
    {
        let order = id+" "
        let counter = 1
        if(document.cookie.indexOf(',counter=')>=0)
        {
            order = id + " " + document.cookie.split(',')[0].split('=')[1]
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1
        }
        document.cookie = "orderId=" + order + ",counter=" + counter
        document.getElementById("badge").innerHTML = counter
        console.log(document.cookie)
    }
    buttonTag.appendChild(buttonText)


    console.log(mainContainer.appendChild(imageSectionspan));
    mainContainer.appendChild(imageSectionspan)
    mainContainer.appendChild(productDetailsspan)
    productDetailsspan.appendChild(h1)
    productDetailsspan.appendChild(h4)
    productDetailsspan.appendChild(detailsspan)
    detailsspan.appendChild(h3Detailsspan)
    detailsspan.appendChild(h3)
    detailsspan.appendChild(para)
    productDetailsspan.appendChild(productPreviewspan)
    
    
    productDetailsspan.appendChild(buttonspan)


    return mainContainer
}



// BACKEND CALLING
let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
  if (this.readyState === 4) {
    if (this.status == 200) {
      console.log('connected!!');
      let contentDetails = JSON.parse(this.responseText);
      console.log(contentDetails);
        let content;
      for (let i = 0; i < contentDetails.length; i++) {
        if (contentDetails[i].id == id) {
          content = contentDetails[i];
          break;
        }
      }

      dynamicContentDetails(content);
    } else {
      console.log('not connected!');
    }
  }
};

httpRequest.open('GET', 'data.json', true);
httpRequest.send();
