import { Component, OnInit, TemplateRef } from '@angular/core';
import { TaskService } from "../services/task.services";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ProjectService } from '../services/project.services';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public id: any
  public taskId : any
  isTask : boolean = true
  taskList : any
  createTaskForm : FormGroup
  editTaskForm : FormGroup
  public files: any[];
  modalRef: BsModalRef;
  currentTask: any
  today: Date
  projectDetail: any
  editProjectForm : FormGroup
  isProfileImage: boolean = false
  userList: any

  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  editModal(template: TemplateRef<any>, taskId: number){
    this.taskService.getAllSubTasks(this.id, taskId).subscribe((response: any) => {
      this.currentTask = response
      this.editTaskForm.setValue({
        editTaskTitle: this.currentTask.title,
        editTaskDes: this.currentTask.description,
        editTaskStartDate: this.currentTask.start_date,
        editTaskEndDate: this.currentTask.end_date,
      });
      this.openModal(template)
    }) 
  }

  editProject(template: TemplateRef<any>){
      this.editProjectForm.setValue({
        editProjectName : this.projectDetail.name,
        editProjectDes: this.projectDetail.description,
        editProjectAvatar: this.projectDetail.avatar
      });
      this.openModal(template)
  }

  constructor(private projectService: ProjectService, private userService: UserService, private taskService: TaskService, private fb: FormBuilder, private modalService: BsModalService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };    
    this.createTaskForm = new FormGroup({
      taskTitle: new FormControl('',Validators.required),
      taskDes: new FormControl(),
      taskStartDate: new FormControl(),
      taskEndDate: new FormControl(),
   });   
   this.editTaskForm = new FormGroup({
    editTaskTitle: new FormControl(),
    editTaskDes: new FormControl(),
    editTaskStartDate: new FormControl(),
    editTaskEndDate: new FormControl(),
   }) 
   this.editProjectForm = new FormGroup({
    editProjectName: new FormControl(),
    editProjectDes: new FormControl(),
    editProjectAvatar: new FormControl(),     
   })   
   this.files = [];
   this.today = new Date()    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('projectId');
    this.id = this.id ? parseInt(this.id,10) : 0
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    if(this.taskId){
      this.isTask = false
      this.getAllSubTasks(parseInt(this.taskId,10))
    } else {
      this.getAllTasks()
    }
    this.projectService.getProject(parseInt(this.id)).subscribe((response : any) => {
      this.projectDetail = response
      if(this.projectDetail?.avatar){
        this.isProfileImage = true
      }      
    })
    this.userService.getAllUsers().subscribe((response) => {
      this.userList = response
      console.log(response);
    })    
  }

  getAllTasks() {
    if(this.isTask){
      this.taskService.getAllTasks(parseInt(this.id,10)).subscribe((response: any) => {
        this.taskList = response;
      });
    }
  }  

  getAllSubTasks(taskId: number){
    this.taskService.getAllSubTasks(parseInt(this.id,10),taskId).subscribe((response: any) => {
      this.taskList = response.sub_tasks;
    });  
  }

  submit() {
    const task: any = {
      title: this.createTaskForm.get("taskTitle")?.value.trim(),
      description: this.createTaskForm.get("taskDes")?.value.trim(),
      start_date: this.createTaskForm.get("taskStartDate").value ? new Date(this.createTaskForm.get("taskStartDate").value).toISOString() : null,
      end_date: this.createTaskForm.get("taskEndDate").value ? new Date(this.createTaskForm.get("taskEndDate").value).toISOString() : null,
      status: 'New',
      project_id: this.id
    };
    if(this.taskId){
      task.parent_id = parseInt(this.taskId,10)
    }
    this.taskService.createTask(parseInt(this.id,10),task).subscribe((response: any) => {
      this.closeModal()
      this.createTaskForm.reset()  
      if(this.taskId){
        this.getAllSubTasks(parseInt(this.taskId,10))
      } else {
        this.getAllTasks()
      }         
    });
  }

  updateTask(taskId: number){
    const task = {
      title: this.editTaskForm.get("editTaskTitle")?.value.trim(),
      description: this.editTaskForm.get("editTaskDes")?.value.trim(),
      start_date: this.editTaskForm.get("editTaskStartDate").value ? new Date(this.editTaskForm.get("editTaskStartDate").value).toISOString() : null,
      end_date: this.editTaskForm.get("editTaskEndDate").value ? new Date(this.editTaskForm.get("editTaskEndDate").value).toISOString() : null,
      status: 'New',
      project_id: this.id      
    };
    this.taskService.updateTask(parseInt(this.id,10), taskId, task).subscribe((response: any) => {
      this.closeModal()
      this.editTaskForm.reset()
      if(this.taskId){
        this.getAllSubTasks(parseInt(this.taskId,10))
      } else {
        this.getAllTasks()
      }
    });    
  }

  deleteTask(projectId: any, taskId: any) {
    this.taskService.deleteTask(parseInt(projectId,10), taskId).subscribe((response: any) => {
      this.getAllTasks()
    })
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
  }

  updateProject(projectId: number){
    const project : any = {
      name: this.editProjectForm.get("editProjectName")?.value.trim(),
      description: this.editProjectForm.get("editProjectDes")?.value.trim(),
    };
    if(this.files){
      project.avatar = this.files?.[0]
    }
    this.projectService.updateProject(projectId, project).subscribe((response: any) => {
      this.closeModal()
      this.editProjectForm.reset()
      this.projectService.getProject(parseInt(this.id)).subscribe((response) => {
        this.projectDetail = response
      }) 
    });    
  }

}
