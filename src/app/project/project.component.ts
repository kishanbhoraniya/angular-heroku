import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ProjectService } from "../services/project.services";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  FormBuilder
} from "@angular/forms";


export interface ProjectType {
  id: number
  name: string
  description: number
  avatar: string | null 
}


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
  projectList : any
  createProjectForm : FormGroup
  editProjectForm : FormGroup
  modalDisplay : boolean = false
  public files: any[];
  modalRef: BsModalRef;
  currentProject: any
  today: Date

  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private projectService: ProjectService, private fb: FormBuilder, private modalService: BsModalService) {
    this.createProjectForm = new FormGroup({
      projectName: new FormControl(),
      projectDes: new FormControl(),
      projectAvatar: new FormControl(),
   });   
   this.files = [];
   this.today = new Date()
  }

  ngOnInit(): void {
    this.getAllProjects()
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe((response: any) => {
      this.projectList = response;
    });
  }  

  onFileChanged(event: any) {
    this.files = event.target.files;
  }

  submit() {
    const project: any = {
      name: this.createProjectForm.get("projectName")?.value.trim(),
      description: this.createProjectForm.get("projectDes")?.value.trim(),
    };
    if(this.files){
      project.avatar = this.files[0]
    }
    this.projectService.createProject(project).subscribe((response: any) => {
      this.closeModal()
      this.createProjectForm.reset()
      this.getAllProjects() 
    });
  }

  deleteProject(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe((response: any) => {
      this.getAllProjects()
    })
  }

}
