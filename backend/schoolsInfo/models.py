from django.db import models

class School(models.Model):
    BOARD_CHOICES = [
        ('CBSE', 'CBSE'),
        ('ICSE', 'ICSE'),
        ('STATE', 'State Board'),
    ]

    name = models.CharField(max_length=255)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    board = models.CharField(max_length=20, choices=BOARD_CHOICES)
    address = models.TextField()
    is_private = models.BooleanField(default=True) # Private vs Government
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0) # e.g. 4.5
    image = models.ImageField(upload_to='schools/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.city}"