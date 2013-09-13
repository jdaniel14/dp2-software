/*
 * This file is part of gwt-gantt
 * Copyright (C) 2010  Scottsdale Software LLC
 *
 * gwt-gantt is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/
 */
package com.bradrydzewski.gwtgantt.model;

/**
 * Defines the type of connection between two Tasks.
 * @author Brad Rydzewski
 */
public enum PredecessorType {

    /**
     * Start to Finish
     */
    SF,
    /**
     * Start to Start
     */
    SS,
    /**
     * Finish to Start
     */
    FS,
    /**
     * Finish to Finish
     */
    FF;
}
