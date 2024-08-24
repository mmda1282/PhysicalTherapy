import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ExercisesServicesService } from "../../services/exercisesServices/exercises-services.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { CategoriesServiceService } from "../../services/categoryService/categories-service.service";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../services/Auth/auth.service";

@Component({
  selector: "app-exercises",
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule],
  templateUrl: "./exercises.component.html",
  styleUrls: ["./exercises.component.css"],
})
export class ExercisesComponent implements OnInit {
  exercises: any[] = [];
  categories: any[] = [];
  selectedIds: number[] = [];
  showFullText: boolean = false;

  exerciseName: string = "";
  imageFile: File | null = null;
  description: string = "";
  exerciseLink: string = "";
  exerciseType: string = "";
  exId: any = "";
  tosatMessge: string = "";
  category: any = "";
  categoryId: string = "";
  selectedCategoryId: number | null = null;
  selectedExerciseType: string | null = null;
  clientNum: string = "";
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  isLoggedIn: boolean = false;


  constructor(
    private _exercisesServic: ExercisesServicesService,
    private route: ActivatedRoute,
    private router:Router,
    private _categoryService: CategoriesServiceService,
    private _loginAuth: AuthService,

  ) {
    this.getAllExercises();
  }

  getAllExercises(): void {
    this.selectedExerciseType = null;
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this._exercisesServic
        .getFilteredExercises(
          id,
          this.selectedExerciseType,
          this.currentPage,
          this.itemsPerPage
        )
        .subscribe({
          next: (res) => {

            this.exercises = res.filteredExercises.$values.map(
              (exercise: any) => ({
                ...exercise,
                showFullText: false,
                showReadMore: exercise.description.length > 50,
              })
            );
          },
          error: (err) => {
            console.error("Error fetching exercises:", err);
          },
        });
    } else {
      console.error("Category ID not found.");
    }

    this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.$values;
        this.category = this.categories.find((cat) => cat.id == id);

      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this._loginAuth.loggedInUser$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.getAllExercises();
  }

  // --------------------crud Optations------------------------------
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.isLoggedIn) {
      const id = this.route.snapshot.paramMap.get("id");

      if (
        this.exerciseName &&
        this.imageFile &&
        this.description &&
        this.exerciseLink &&
        this.exerciseType &&
        id
      ) {
        this._exercisesServic
          .addExercise(
            this.exerciseName,
            this.imageFile,
            this.description,
            this.exerciseLink,
            this.exerciseType,
            +id
          )
          .subscribe({
            next: (res) => {
              this.showToast("تم اضافة التمرين بنجاح!");

              this.exercises.push({
                id: res.id,
                name: this.exerciseName,
                description: this.description,
                exerciseLink: this.exerciseLink,
                exerciseType: this.exerciseType,
                categoryId: +id,
                photoUrl: res.photoUrl,
              });
              this.clearForm();
            },
            error: (err) => {
              console.error("Error adding exercise:", err);
            },
          });
      }
    } else {
       this.router.navigate(['/login'])
    }
  }

  onUpdate(): void {
    if (this.isLoggedIn) {
      const id = this.route.snapshot.paramMap.get("id");
      const exercise = this.exercises.find((ex) => ex.id == this.exId);

      if (exercise && this.imageFile && id) {
        this._exercisesServic
          .updateExercise(
            this.exId,
            this.exerciseName,
            this.imageFile,
            this.description,
            this.exerciseLink,
            this.exerciseType,
            +id
          )
          .subscribe({
            next: (res) => {
              this.showToast("تم تعديل التمرين بنجاح!");

              this.exercises = this.exercises.map((ex) =>
                ex.id === this.exId ? { ...res } : ex
              );
              this.clearForm();
            },
            error: (err) => {
              console.error("Error updating exercise:", err);
            },
          });
      }
    } else {
       this.router.navigate(['/login'])
    }
  }

  deleteExercise(id: any): void {
    if (this.isLoggedIn) {
      
   
    this._exercisesServic.deleteExercise(id).subscribe({
      next: () => {
        this.exercises = this.exercises.filter((ex) => ex.id !== id);
        this.showToast("تم حذف التمرين بنجاح!");
      },
      error: (err) => {
        console.error("Error deleting exercise:", err);
      },
    });
    } else {
       this.router.navigate(['/login'])
       }
  }

  // --------------------more functions to useing comfotable------------------------------

  toggleText(exercise: any): void {
    exercise.showFullText = !exercise.showFullText;
  }
  showToast(toastMessage: string): void {
    const toastElement = document.getElementById("creatToast");
    this.tosatMessge = toastMessage;
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
  }

  clearForm(): void {
    this.exerciseName = "";
    this.imageFile = null;
    this.description = "";
    this.exerciseLink = "";
    this.exerciseType = "";
  }

  sendExId(exId: any): void {
    this.exId = exId;
    if (this.exId) {
      const ex = this.exercises.find((ex) => ex.id === this.exId);

      this.exerciseName = ex.name;
      this.exerciseLink = ex.exerciseLink;
      this.exerciseType = ex.exerciseType;
      this.description = ex.description;
    }
  }

  // --------------------send to whatsapp------------------------------
  onCheckboxChange(id: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.selectedIds.includes(id)) {
        this.selectedIds.push(id);
      }
    } else {
      this.selectedIds = this.selectedIds.filter(
        (selectedId) => selectedId !== id
      );
    }
  }

  sendSelectedLinks() {
    const clientNumber = this.clientNum;

    const selectedLinks = this.exercises
      .filter((exercise) => this.selectedIds.includes(exercise.id))
      .map((exercise) => exercise.exerciseLink);

    if (selectedLinks.length > 0) {
      const payload = {
        links: selectedLinks,
        clientNumber: clientNumber,
      };

      this._exercisesServic.sendExLinkst(payload).subscribe({
        next: (res) => {
          this.showToast("تم ارسال الروابط بنجاح");
        },
        error: (err) => {
          console.error("Error sending links:", err);
        },
      });
    } else {
      console.log("No links selected.");
      this.showToast("لم تقم بتحديد العناصر لارسالها");
    }
  }
  // --------------------filteration & pagenation------------------------------

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllExercises();
    }
  }

  goToNextPage(): void {
    if (this.exercises.length === this.itemsPerPage) {
      this.currentPage++;
      this.getAllExercises();
    }
  }

  getFilteredExercises(): void {
    this.category = this.categories.find(
      (cat) => cat.id == this.selectedCategoryId
    );

    this._exercisesServic
      .getFilteredExercises(
        this.selectedCategoryId,
        this.selectedExerciseType,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe(
        (data: any) => {

          this.exercises = data.filteredExercises.$values;
        },
        (error: any) => {
          console.error("Error fetching exercises", error);
        }
      );
  }
}
