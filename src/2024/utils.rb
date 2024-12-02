def read_file(file)
  # Get the full path to the file using File.join and __dir__
  rel_path = File.join(__dir__, file)

  # Read the file contents with the 'utf-8' encoding
  return File.read(rel_path, encoding: 'UTF-8')
end