import { CoursesService } from './courses.service';
import { Component } from "@angular/core";

@Component({
    selector: 'courses',
    template: `
    <h2>{{ title }}</h2>
    <img src="{{ imageUrl }}" />
    `
})
export class CoursesComponent {
    title = "List of Courses";
    courses;
    imageUrl = "http://lorempixel.com/400/200";

    constructor(service: CoursesService) {
        this.courses = service.getCourses();
    }
}