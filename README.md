## About the app

IIt is important to note that we take into account the data traffic from the end of the exams of the first and second semester because the solution will only include the annual averages of the students to propose a deliberation based on the established rules, the latter will be reviewed manually and will therefore be corrected to determine the fate of the student.
After the exams, for all the courses, the professors send the annual averages for some of them and others simply send the grades of the students' works in excel, pdf or handwritten format to the general academic secretariat, with a copy to the faculty concerned, which in this case is represented by a dean.
The faculty (the dean) then forwards the grades received in one of the above formats to the jury members.
The jury, after receiving the grades in any format, encodes them in Excel and communicates the results after calculating the annual average for the first semester. For the second semester, after receiving all the grades, the jury calculates the percentage of each student, and then deliberates, keeping in mind the criteria for deliberation, including the course credit, since the LMD system is used.
After the deliberation, the students are called to collect their grades and to see how they fared.

### Actors

* Professors
* General academic secretary
* The dean
* The jury
* The student

### Use cases

Professors
* Send annual averages

General academic secretary
* Receive annual averages
* Send annual averages to the dean

 Dean
* Receive annual averages
* Send annual averages to the jury

Jury
* Receive annual averages
* Calculate grades
* Send grades to the dean
* Send grades to students

Student
* Receive grades
* Receive annual averages

## Requirements
* composer : 2.3.10
* php : 8.1
* npm : 8^ or yarn : 1.23^
* laravel : 10^

## Install dependencies

`$ composer install
`
<br />
`
$ yarn install or npm install
`

## Migrate

`
$ php artisan migrate
`

## Seed the database

`
$ php artisan db:seed
`



## Lunch the project

`
$ yarn dev or npm run dev
`
<br />
`
$ php artisan serve
`

