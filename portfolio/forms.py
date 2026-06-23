from django import forms
from .models import Contact

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control glass-input',
                'placeholder': 'Your Name',
                'id': 'contact-name',
                'required': True
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control glass-input',
                'placeholder': 'Your Email Address',
                'id': 'contact-email',
                'required': True
            }),
            'subject': forms.TextInput(attrs={
                'class': 'form-control glass-input',
                'placeholder': 'Subject of discussion',
                'id': 'contact-subject',
                'required': True
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-control glass-input',
                'placeholder': 'Tell me about your project, goals, or questions...',
                'id': 'contact-message',
                'rows': 5,
                'required': True
            }),
        }
