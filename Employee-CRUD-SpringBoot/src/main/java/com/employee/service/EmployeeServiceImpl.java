package com.employee.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.dao.IEmployeeDao;
import com.employee.model.EmployeeModel;

@Service("EmployeeServiceImpl")
public class EmployeeServiceImpl implements IEmployeeService {

	Logger log = LoggerFactory.getLogger(EmployeeServiceImpl.class);

	private @Autowired IEmployeeDao employeeDao;

	@Override
	public EmployeeModel getEmployeeById(int id) {
		log.info("@getEmployeeById invoked with employeeId : {}", id);
		Optional<EmployeeModel> employeeById = employeeDao.findById(id);
		EmployeeModel employeeModel = null;
		if (employeeById.isPresent()) {
			employeeModel = employeeById.get();
		}
		return employeeModel;
	}

	@Override
	public List<EmployeeModel> getAllEmployee() {
		log.info("@getAllEmployee invoked");
		return employeeDao.findAll();
	}

	@Override
	public void deleteEmployee(Integer id) {
		log.info("@deleteEmployee invoked with employeeId : {}", id);
		employeeDao.deleteById(id);
		log.info("EMPLOYEE DELETED With employeeId: {}", id);
	}

	@Override
	public EmployeeModel updateEmployee(EmployeeModel employeeModel) {
		log.info("@updateEmployee invoked with employeeId : {}", employeeModel.getId());

		Optional<EmployeeModel> employeeById = employeeDao.findById(employeeModel.getId());
		EmployeeModel employeeModelUpdated = null;
		if (employeeById.isPresent()) {
			employeeModelUpdated = employeeById.get();
			employeeModelUpdated.setName(employeeModel.getName());
			employeeModelUpdated.setDepartment(employeeModel.getDepartment());
			employeeModelUpdated.setAddress(employeeModel.getAddress());
			employeeDao.save(employeeModelUpdated);
			log.info("EMPLOYEE UPDATED : {}", employeeModelUpdated);
		}
		return employeeModelUpdated;
	}

	@Override
	public EmployeeModel addEmployee(EmployeeModel employeeModel) {
		log.info("@addEmployee invoked with new employeeObject : {}", employeeModel);
		return employeeDao.save(employeeModel);
	}

}
