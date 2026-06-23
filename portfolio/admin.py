from django.contrib import admin
from .models import Project, Contact

# Customizing Admin headers and titles to match the portfolio branding
admin.site.site_header = "Siddhi Thale Portfolio Admin"
admin.site.site_title = "Siddhi Thale Admin Portal"
admin.site.index_title = "Welcome to your Portfolio Dashboard"

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'github_link', 'live_link')
    list_editable = ('order',)
    search_fields = ('title', 'description', 'technologies')
    list_filter = ('technologies',)
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'technologies', 'image')
        }),
        ('Links & Ordering', {
            'fields': ('github_link', 'live_link', 'order')
        }),
    )

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    list_filter = ('created_at', 'email')
    search_fields = ('name', 'email', 'subject', 'message')
    # Make form entries read-only to maintain reliable client interaction logs
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
    
    def has_add_permission(self, request):
        # Client messages are only created by submissions on the frontend
        return False
