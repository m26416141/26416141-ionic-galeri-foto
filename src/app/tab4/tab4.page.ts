import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

export interface fileFoto {
  name: string; //filepath
  path: string; //web
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  urlImageStorage : string[] = [];

  constructor(
    private afStorage: AngularFireStorage,
    public fService: FotoService
  ) { }

  async ionViewDidEnter() {
    console.log("ionviewdidenter")
    await this.fService.loadFoto();
    this.tamplikandata();
  }

  hapusfoto() {
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.delete().then(() => {
          //menampilkan data
          this.tamplikandata();
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  tamplikandata() {
    this.urlImageStorage = []
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then(url => {
          this.urlImageStorage.unshift(url)
        })
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  uploadfoto() {
    this.urlImageStorage = []
    for (var index in this.fService.dataFoto) {
      const imgFilePath = `imgStorage/${this.fService.dataFoto[index].filePath}`;
      
      this.afStorage.upload(imgFilePath, this.fService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilePath).getDownloadURL().then((url) => {
          this.urlImageStorage.unshift(url)
          console.log(url)
        });
      });
    }
  }

  async ngOnInit() {
    
  }
}
