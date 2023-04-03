
class HtmlElement {
  constructor(tag, tag_self_closing, text, atr = [], style = [], tag_childs = []) {
    this.tag = tag;
    this.tag_self_closing = tag_self_closing;
    this.text = text;
    this.atr = atr;
    this.style = style;
    this.tag_childs = tag_childs;
  }

  formAtr() {
    if(this.atr.length < 1) {return ""}
    let atributes = " ";
    for(let obj of this.atr) {
      atributes += obj.key + '="' + obj.val + '" '
    }
    return atributes;
  }

  formStyle() {
    if(this.style.length < 1) {return ""}
    let styles = ' style=" ';
    for(let obj of this.style) {
      styles += obj.key + ': ' + obj.val + '; '
    }
    return styles + '"';
  }

  childToFirst(child) {
    this.tag_childs.splice(0, 0, this.tag_childs.splice(this.tag_childs.indexOf(child), 1)[0]);
  }
  childToLast(child) {
    this.tag_childs.splice(this.tag_childs.length, 0, this.tag_childs.splice(this.tag_childs.indexOf(child), 1)[0]);
  }
  
  getHtml() {
    if(this.tag_self_closing) {
      if(this.tag_childs.length < 1) {
        return "<" + this.tag + this.formAtr() + this.formStyle() + ">" + this.text + "</" + this.tag + ">"
      } else {
        let childs = " ";
        for(let i = 0; i < this.tag_childs.length; i++) {
          childs += this.tag_childs[i].getHtml() + " "
        }
        return "<" + this.tag + this.formAtr() + this.formStyle() + ">" + this.text + childs + "</" + this.tag + ">"
        
      }
       
    } else {
      return "<" + this.tag + this.formAtr() + this.formStyle() + ">" + this.text
        
    }
    
  }

  
}


let a = new HtmlElement("a", true, "More...", 
[{key: "href", val: "https://www.lipsum.com/"}, {key: "target", val: "_blank"}],
[], [] )

let p = new HtmlElement("p", true, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi quibusdam iusto porro deleniti praesentium unde velit culpa quo sunt ipsam, aliquam tempora incidunt molestias minima quia explicabo, exercitationem ducimus quas?", 
[],
[{key: "text-align", val: "justify"}], [a] ) 

let img = new HtmlElement("img", false, "", 
[{key: "src", val: "lipsum.jpg"}, {key: "alt", val: "Lorem Ipsum"}],
[{key: "width", val: "100%"}], [] )

let h3 = new HtmlElement("h3", true, "What is the Lorem Ipsum?", 
[],
[], [] )


let div2 = new HtmlElement("div", true, "", 
[],
[{key: "width", val: "300px"}, {key: "margin", val: "10px"}], [h3, img, p] )


let div1 = new HtmlElement("div", true, "", 
[{key: "id", val: "wrapper"}],
[{key: "display", val: "flex"}], [div2, div2] )

document.write(div1.getHtml())
