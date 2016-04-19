describe('Notification component', function() {
  it('should have toastr defined', function() {
    expect(toastr).toBeDefined();
    expect(toastr.success).toBeDefined();
    expect(toastr.error).toBeDefined();
    expect(toastr.info).toBeDefined();
    expect(toastr.warning).toBeDefined();
  });
});