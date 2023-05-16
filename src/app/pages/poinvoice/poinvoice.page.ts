import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-poinvoice',
  templateUrl: './poinvoice.page.html',
  styleUrls: ['./poinvoice.page.scss'],
}) 
export class PoinvoicePage implements OnInit {
  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];
  
  
  constructor(private iab : InAppBrowser) { }

  ngOnInit() {
//     const doc = new jsPDF();

// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");
  }
  
  print(){
    window.print();
  }
   
 
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('invoice.pdf');
    });
  }

  openInAppBrow2() {
    const browser = this.iab.create('https://evramedia.com/apifolder/folder/invoice.php', '_system', 'location=no, zoom=yes ');
    browser.on('loadstart').subscribe(data => {
     console.log(data.url);
     if (data.url === 'https://evramedia.com/') {
       browser.close();
     }
    });
   }
  

}
