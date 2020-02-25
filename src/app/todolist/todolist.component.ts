import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbDateStruct, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  providers:[ConfirmationService]
})
export class TodolistComponent implements OnInit {
  modalRef: any;
  closeResult: string;
  addNoteForm: any;
  token: any;
  notesList: any;
  notesCount: any;
  first=0
  currentNote: any;
  userdata: any;
  loader: boolean;
  constructor(private modalService:NgbModal,private fb:FormBuilder,private toast:ToastrService,private primeservice:ConfirmationService,private service:ApiService) { 
    this.addNoteForm=this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required]
    })
  }

  ngOnInit() {
    this.loader=true
    this.userdata=JSON.parse(localStorage.getItem('userinfo'))
    this.getNotesList({page:1,limit:10})
  }
  getNotesList(data){
  
    this.service.getNotes(data).subscribe((notes:any)=>{
      console.log(notes)
      this.loader=false
      this.notesList=notes.Notes;
      this.notesCount=notes.count
    },(err)=>{
      this.toast.error('','Something went wrong')
    })
  }
  setPage(event){
    this.loader=true
    console.log(event)
    this.getNotesList({page:event.page+1,limit:10})
  }
showaddNoteModal(content){
  this.addNoteForm.reset()
  this.modalRef = this.modalService.open(content, { backdrop: 'static', keyboard: false, size: 'lg', centered: true });
  this.modalRef.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
showData(content,data){
  console.log(data)
  this.currentNote=data
  this.addNoteForm.controls['title'].patchValue(data.title)
  this.addNoteForm.controls['description'].patchValue(data.description)
  console.log(this.currentNote)
  this.modalRef = this.modalService.open(content, { backdrop: 'static', keyboard: false, size: 'lg', centered: true });
  this.modalRef.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
deleteNotes(currentNote){
  console.log("cli",currentNote._id)
  this.primeservice.confirm({
    message: 'Are you sure that you want to Delete?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      console.log('hghg')
        //this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        let data={
          // "title":this.addNoteForm.value.title,
          "id":currentNote._id
        }
        this.service.deleteNote(data).subscribe((res)=>{
        if(res){
          this.toast.success('','Deleted Successfuly')
          this.getNotesList({page:1,limit:10})
          //this.modalRef.close()
        }
        },(err)=>{
          console.log(err)
          this.toast.error('','Something went wring')
         })
    },
    reject: () => {
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
    }
});

}
editNote(){
  console.log(this.userdata)
let data={
  "title":this.addNoteForm.value.title,
	"id":this.currentNote._id,
	"description":this.addNoteForm.value.description,
	"modifiedBy":this.userdata.username
}
this.service.editNote(data).subscribe((res)=>{
if(res){
  this.toast.success('', 'Updated Successfully');
  this.getNotesList({page:1,limit:10})
  this.modalRef.close()
}
},(err)=>{
  console.log(err)
  this.toast.error('','Something went wring')
})
}


addNote(){
  let data={
    "title":this.addNoteForm.value.title,
    "description":this.addNoteForm.value.description,
    "createdBy":this.userdata.username
  }
  console.log(data)
  this.service.createNote(data).subscribe((res)=>{
  if(res){
    this.toast.success('','New Note added Successfuly')
    this.getNotesList({page:1,limit:10})
    this.modalRef.close()
  }
  },(err)=>{
    console.log(err)
    this.toast.error('','Something went wring')
  })
}
// This function is used in open
private getDismissReason(reason:
  any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
