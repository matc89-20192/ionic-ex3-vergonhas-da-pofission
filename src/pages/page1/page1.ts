import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  taskList: Array<{description: string, priority: string, cardinality: number}> = [];
  new_description: string;
  new_priority: string;
  isTaskListEmpty: boolean = true;
  currentTask: number = 1;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }
  
  removeTask() {
    this.taskList.shift();
    this.isTaskListEmpty = this.taskList.length ? false : true;
  }

  addTask() {
    if (this.isTaskValid(this.new_description, this.new_priority)) {
      let new_task = { description: this.new_description, priority: this.new_priority, cardinality: this.currentTask };
      this.currentTask++;
      this.taskList.push(new_task);
      this.isTaskListEmpty = false;

      this.taskList.sort((taskA, taskB) => {
        if (+taskA.priority < +taskB.priority ||
            +taskA.priority == +taskB.priority && taskA.cardinality < taskB.cardinality) return -1;
        return 1;
      });

      this.new_description = this.new_priority = "";
    }
  }

  isTaskValid(taskDescription: string, taskPriority: string) {
    let validTask = true;

    if (taskDescription == "" || taskPriority == "") {
      validTask = false;
    }
    else if (+taskPriority < 1 || +taskPriority > 10) {
      let toast = this.toastCtrl.create({
        message: "A prioridade deve estar entre 1 e 10.",
        duration: 2000
      });
      toast.present();

      validTask = false;
    }

    for(let task of this.taskList) {
      if (taskDescription == task.description) {
        let toast = this.toastCtrl.create({
          message: "Tarefa já cadastrada.",
          duration: 2000
        });
        toast.present();

        validTask = false;

        break;
      }
    }

    return validTask;
  }

}