import { Component, inject, OnInit, signal, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DemandeService, UserService } from '../../../core/services';
import { User, Demande } from '../../../core/models';

@Component({
  selector: 'app-demande-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './demande-form.component.html',
  styleUrl: './demande-form.component.css',
})
export class DemandeFormComponent implements OnInit {
  /** Injected from route param — present in edit mode, absent in create mode */
  @Input() id?: string;

  private readonly demandeService = inject(DemandeService);
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly users = signal<User[]>([]);
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);

  /** True when editing an existing demande */
  get isEditMode(): boolean {
    return !!this.id;
  }

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', Validators.required],
    assignedToId: [''],
  });

  ngOnInit(): void {
    // Load users for the assignee dropdown
    this.userService.getAll().subscribe({
      next: (users) => this.users.set(users),
    });

    // Prefill the form when editing
    if (this.isEditMode) {
      this.demandeService.getById(this.id!).subscribe({
        next: (demande: Demande) => {
          this.form.patchValue({
            title: demande.title,
            description: demande.description,
            assignedToId: demande.assignedTo?.id ?? '',
          });
        },
        error: () => this.router.navigate(['/dashboard']),
      });
    }
  }

  /** Returns true if a field is invalid and has been touched */
  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, description, assignedToId } = this.form.value;
    this.isSubmitting.set(true);
    this.submitError.set(null);

    const payload = {
      title: title!,
      description: description!,
      assignedToId: assignedToId || undefined,
    };

    const request$ = this.isEditMode
      ? this.demandeService.update(this.id!, payload)
      : this.demandeService.create(payload);

    request$.subscribe({
      next: (demande) => this.router.navigate(['/demandes', demande.id]),
      error: () => {
        this.submitError.set('Une erreur est survenue. Veuillez réessayer.');
        this.isSubmitting.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate([
      this.isEditMode ? `/demandes/${this.id}` : '/dashboard',
    ]);
  }
}
