# Require the utils.rb file using require_relative
require_relative '../utils'

# Call the read_file function to read the contents of data.txt
file_path = 'day-02/data.txt'  # Path to the data.txt file relative to the project root
file_content = read_file(file_path)

def check_element (acc, curr, index) 
  # puts "Acc: #{acc}, Curr: #{curr}, Index: #{index}"

  return acc if acc[:safe] == false
  
  if index == 0
    acc[:last] = curr
  else

    if index == 1
      acc[:direction] = (acc[:last] - curr) <=> 0 # Math.sign equivalent in Ruby
    end
  
    diff = acc[:last] - curr
    acc[:last] = curr
  
    # Compare direction
    if diff * acc[:direction] < 0
      acc[:safe] = false
    end
  
    # Compare step size (min = 1, max = 3)
    if diff.abs > 3 || diff.abs < 1
      acc[:safe] = false
    end
  
  end
  acc
end

def is_safe_func (line)
  is_safe = line.each.with_index.reduce({ safe: true, direction: nil, last: nil }) do | acc, (curr, index) |
    check_element(acc, curr, index)
  end

  return is_safe
end

lines = file_content.split("\n")
  .map { |line| line.split(" ").map{ |item| item.to_i } }

checked_lines = lines.map { |line| is_safe_func(line) }
safe_list = checked_lines.select { |line| line[:safe] }
puts "Part 1: #{safe_list.length}"


#
# Part 2
#

# This time, if a line is unsafe, we need to iterate over it m number of times 
# each time testing if ignoring a single element will allow it to pass


def is_safe_damp_func (line)
  is_safe = line.each.with_index.reduce({ safe: true, direction: nil, last: nil }) do | acc, (curr, index) |
    check_element(acc, curr, index)
  end
  return is_safe if is_safe[:safe]

  # try to ignore each element
  # run recursively over each line with one element removed
  for delete_index in 1..line.length
    is_safe = line.dup.tap{|i| i.delete_at(delete_index - 1)}.each.with_index.reduce({ safe: true, direction: nil, last: nil }) do | acc, (curr, index) |
      check_element(acc, curr, index)
    end
    return is_safe if is_safe[:safe]
  end

  return is_safe
end

damp_safe_lines = lines.map{ |line| is_safe_damp_func(line) }
damp_safe_list = damp_safe_lines.select { |line| line[:safe] }

puts "Part 2: #{damp_safe_list.length}"