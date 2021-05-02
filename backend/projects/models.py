from django.db import models

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    duration = models.IntegerField()
    avatar = models.ImageField(upload_to="projects/")

    def __str__(self):
        return self.title


class Task(models.Model):
    project = models.ForeignKey("Project", on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.title


class Subtask(models.Model):
    task = models.ForeignKey("Task", on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    status = models.CharField(max_length=20)

    def __str__(self):
        return self.title
