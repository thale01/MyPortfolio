from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='projects/', blank=True, null=True, help_text="Upload a project screenshot.")
    description = models.TextField()
    technologies = models.CharField(
        max_length=500, 
        help_text="Comma-separated list of technologies (e.g., Django, Python, MySQL, HTML)"
    )
    github_link = models.URLField(blank=True, null=True, help_text="GitHub repository URL")
    live_link = models.URLField(blank=True, null=True, help_text="Live demo URL")
    order = models.IntegerField(default=0, help_text="Display order (lower numbers show first)")

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title

    def get_tech_list(self):
        """Returns the technologies as a list of trimmed strings for easy badge iteration."""
        if self.technologies:
            return [tech.strip() for tech in self.technologies.split(',')]
        return []

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
