from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from .models import Project
from .forms import ContactForm

def home(request):
    """Renders the main single-page portfolio with all sections."""
    projects = Project.objects.all().order_by('order', 'id')
    form = ContactForm()
    
    context = {
        'projects': projects,
        'contact_form': form,
    }
    return render(request, 'portfolio/index.html', context)

def contact_submit(request):
    """Processes secure contact form submissions, supporting standard POST and AJAX requests."""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact_instance = form.save()
            
            # Send SMTP email notification
            try:
                from django.core.mail import send_mail
                from django.conf import settings
                
                email_subject = f"Portfolio Contact: {contact_instance.subject}"
                email_message = f"Hello Siddhi,\n\nYou have received a new contact message from your portfolio site:\n\n" \
                                f"Name: {contact_instance.name}\n" \
                                f"Email: {contact_instance.email}\n" \
                                f"Subject: {contact_instance.subject}\n\n" \
                                f"Message:\n{contact_instance.message}\n\n" \
                                f"---\n" \
                                f"Sent via your Django Portfolio website."
                
                send_mail(
                    subject=email_subject,
                    message=email_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_RECEIVER],
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error gracefully so the form submission doesn't crash if SMTP is not fully set up
                print(f"SMTP email forward failed: {e}")

            success_msg = "Thank you! Your message has been sent successfully. I will get back to you shortly."
            
            # Detect AJAX request
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({
                    'status': 'success',
                    'message': success_msg
                })
            
            messages.success(request, success_msg)
            return redirect('portfolio:home')
        else:
            # Form is invalid
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({
                    'status': 'error',
                    'errors': form.errors
                }, status=400)
            
            # Non-AJAX fallback
            projects = Project.objects.all().order_by('order', 'id')
            context = {
                'projects': projects,
                'contact_form': form,
                'contact_error': True
            }
            messages.error(request, "There was an error in your submission. Please correct the fields below.")
            return render(request, 'portfolio/index.html', context)
            
    return redirect('portfolio:home')
