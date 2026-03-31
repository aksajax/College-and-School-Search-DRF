from django.db import models

class College(models.Model):
    name = models.CharField(max_length=255)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    description = models.TextField()
    website = models.URLField(blank=True, null=True)
    ranking = models.IntegerField(default=0)
    image = models.ImageField(upload_to='colleges/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.state})"