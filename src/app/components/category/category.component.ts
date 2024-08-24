import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CategoriesServiceService } from '../../services/categoryService/categories-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule, FormsModule,],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  newCategoryName: string = '';
  newCategoryimageFile: File | null = null;
  errorSubmitMessage: string = '';
  toastId: string = '';
  toastMessage: string = '';
  categoryId: Number = 0;
  isLoggedIn: boolean = false;


  constructor(private _categoryService: CategoriesServiceService,private _loginAuth:AuthService , private router: Router) {
    this.loadCategories()
  }

  ngOnInit(): void {
    this._loginAuth.loggedInUser$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.loadCategories()
  }
  // --------------Auth-------------------
  logout() {
    localStorage.removeItem('token@12E$n7');
    window.location.reload();
  }
  //--------------------------crud------------------
    loadCategories() {
    this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.$values;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  onUpdate(): void {
    if (this.isLoggedIn) {
      if (this.newCategoryName && this.newCategoryimageFile) {
        this._categoryService.updateCategory(this.categoryId, this.newCategoryName, this.newCategoryimageFile).subscribe({
          next: (res) => {
            this.showToast('تم تعديل الفئة بنجاح!');
            this.categories = this.categories.map((cat) => cat.id === this.categoryId ? { ...res } : cat);
            this.clearForm()
          },
          error: (err) => {
            console.error('Error updating category:', err);
            this.showToast('حدث مشكلة برحاء اعادة المحاولة مرة اخري');

          }
        });
      }
    } else {
       this.router.navigate(['/login'])
    }
  }
  onSubmit(): void {
    if (this.isLoggedIn) {
      if (this.newCategoryName && this.newCategoryimageFile) {
        this._categoryService.addCategory(this.newCategoryName, this.newCategoryimageFile).subscribe(
          {
            next: (res) => {
              this.showToast('تم اضافة الفئة بنجاح!');

              this.categories.push({ name: this.newCategoryName, photoUrl: (res as any).photoUrl });
              this.clearForm()
            },
            error: (err) => {
              console.error(err);
              this.showToast('حدث مشكلة برحاء اعادة المحاولة مرة اخري');
            },
          }
        )
      }
    } else (
      this.router.navigate(['/login'])
    )
  }
  onFileSelected(event: any): void {
    this.newCategoryimageFile = event.target.files[0];
  }
  deleteCategory(id: any) {
    if (this.isLoggedIn) {
      this._categoryService.deleteCategory(id).subscribe({
        next: (res) => {
          this.categories = this.categories.filter(category => category.id !== id);
          this.showToast('تم حذف الفئة بنجاح!');
        },
        error: (err) => {
          console.error(err);
          this.showToast('حدث مشكلة برحاء اعادة المحاولة مرة اخري');
        },
      });
    } else {
       this.router.navigate(['/login'])
    }
  }
//-----------------------some more functions------------------------------------

  showToast(toastMessage: string) {
    this.toastMessage = toastMessage;
    const toastElement = document.getElementById('creatToast');

    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
  }
    clearForm(): void {
    this.newCategoryName = '';
    this.newCategoryimageFile = null;
  }
  
  sendIdCat(id: any): void {
    this.categoryId = id;
    if (this.categoryId) {
      const category = this.categories.find(c => c.id === this.categoryId);

      this.newCategoryName = category.name;
      this.newCategoryimageFile = category.photoUrl;

    }
  }
}


