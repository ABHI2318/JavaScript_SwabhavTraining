document.addEventListener('DOMContentLoaded', () => {
    // Container to append the form and buttons
    const container = document.getElementById('formContainer');
    
    // Placeholder for storing timesheet entries
    const timesheetEntries = [];
  
    // Creating the form section
    const formSection = `
      <div class="d-flex justify-content-between align-items-center mb-3">
       
        <h2 class="text-center">Add Timesheets</h2>
        
      </div>
      <div class="row">
        <div class="col-md-2">
          <div class="form-group">
            <label for="date">Date:</label>
            <input type="date" class="form-control" id="date" required>
          </div>
          <div class="form-group">
            <label for="onLeave">On Leave:</label>
            <select class="form-control" id="onLeave">
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>
        <div class="col-md-8">
          <div class="d-flex">
            <div class="form-group flex-fill">
              <label for="project">Project:</label>
              <input type="text" class="form-control" id="project" placeholder="Enter project name">
            </div>
            <div class="form-group flex-fill">
              <label for="subProject">Sub-Project:</label>
              <input type="text" class="form-control" id="subProject" placeholder="Enter sub-project name">
            </div>
            <div class="form-group flex-fill">
              <label for="batch">Batch:</label>
              <input type="text" class="form-control" id="batch" placeholder="Enter batch">
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group">
              <label for="hours">Hours Needed:</label>
              <div class="d-flex">
                <input type="number" class="form-control" id="hours" placeholder="Hours">
                <input type="number" class="form-control" id="minutes" placeholder="Minutes">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="activity">Activity:</label>
            <textarea class="form-control" id="activity" rows="4" placeholder="Describe your activities..."></textarea>
          </div>
          <button class="btn btn-secondary mt-2" id="addActivityButton">Add Activity</button>
        </div>
        <div class="col-md-2 d-flex justify-content-end align-items-start">
          <i class="bi bi-pencil-square"></i>
        </div>
      </div>
      <div class="btn-container">
        <button class="btn btn-success" id="previewButton">Preview</button>
        <button class="btn btn-danger">Cancel</button>
      </div>
      <div class="modal fade" id="previewModal" tabindex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="previewModalLabel">Preview Added Timesheets</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table table-bordered modal-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Date</th>
                    <th>On Leave</th>
                    <th>Project</th>
                    <th>Sub-Project</th>
                    <th>Batch</th>
                    <th>Activity</th>
                    <th><i class="bi bi-clock"></i> Time Logged</th>
                    <th>Total Hours</th>
                  </tr>
                </thead>
                <tbody id="previewTableBody"></tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success">Add Timesheets</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Back</button>
            </div>
          </div>
        </div>
      </div>
    `;
  
    // Append the form section to the container
    container.innerHTML = formSection;
  
    // Add Activity functionality
    document.getElementById('addActivityButton').addEventListener('click', function() {
      // Collect values from the form fields
      const date = document.getElementById('date').value;
      const onLeave = document.getElementById('onLeave').value;
      const project = document.getElementById('project').value;
      const subProject = document.getElementById('subProject').value;
      const batch = document.getElementById('batch').value;
      const hours = document.getElementById('hours').value;
      const minutes = document.getElementById('minutes').value;
      const activity = document.getElementById('activity').value;
  
      // Format total hours
      const totalHours = `${hours.padStart(2, '0')} hrs ${minutes.padStart(2, '0')} mins`;
  
      // Add activity to the list
      timesheetEntries.push({ date, onLeave, project, subProject, batch, activity, hours, minutes, totalHours });
  
      // Show confirmation without clearing form fields
      alert('Activity Added');
    });
  
    // Preview functionality
    document.getElementById('previewButton').addEventListener('click', () => {
      const previewTableBody = document.getElementById('previewTableBody');
      previewTableBody.innerHTML = '';
  
      timesheetEntries.forEach((entry, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${index + 1}</td>
          <td>${entry.date}</td>
          <td>${entry.onLeave}</td>
          <td>${entry.project}</td>
          <td>${entry.subProject}</td>
          <td>${entry.batch}</td>
          <td>${entry.activity}</td>
          <td><i class="bi bi-clock"></i> ${entry.hours.padStart(2, '0')} hrs ${entry.minutes.padStart(2, '0')} mins</td>
          <td>${entry.totalHours}</td>
        `;
        previewTableBody.appendChild(newRow);
      });
  
      $('#previewModal').modal('show');
    });
  });
  